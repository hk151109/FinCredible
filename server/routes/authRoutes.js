const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

// Set up Google OAuth2 credentials
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/ResetPw" // Local Redirect URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Nodemailer transporter using Google OAuth2
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USERNAME,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken: async () => {
      const accessToken = await getAccessToken();
      return accessToken;
    },
  },
});

// Function to refresh OAuth2 token
async function getAccessToken() {
  try {
    const { token } = await oauth2Client.getAccessToken();
    return token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
}

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send reset email
    const mailOptions = {
      from: `"MERN Auth App" <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: "Password Reset Verification",
      html: `
        <p>We received a request to reset your account password. To reset your password, click the link below:</p>
        <p><a href="http://localhost:3000/ResetPw/${resetToken}">Reset Password</a></p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Reset password email sent" });
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

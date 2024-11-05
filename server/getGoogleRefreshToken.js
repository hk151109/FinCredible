require("dotenv").config(); // Load environment variables from .env
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID, // Use Google Client ID from .env
  process.env.GOOGLE_CLIENT_SECRET, // Use Google Client Secret from .env
  "http://localhost:5000/auth/google/callback" // Redirect URI
);

const scopes = [
  "https://www.googleapis.com/auth/gmail.send", // Gmail API scope for sending emails
  "https://www.googleapis.com/auth/userinfo.email", // For accessing user email
  "https://www.googleapis.com/auth/userinfo.profile" // For accessing user profile
];

const url = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  prompt: "consent", // Ensures a refresh token is returned
});

console.log("Authorize this app by visiting this URL:", url);

const getRefreshToken = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  console.log("Refresh Token:", tokens.refresh_token);
};

// Uncomment the line below, replace 'YOUR_AUTHORIZATION_CODE' with the code you get from Google, then run the file.
getRefreshToken("YOUR_AUTHORIZATION_CODE");

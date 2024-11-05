const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  "894542221244-rscd09erfmvp0e6e15jhkl0m8a6slieu.apps.googleusercontent.com", // Replace with your Google Client ID
  "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", // Replace with your Google Client Secret
  "http://localhost:5000/auth/google/callback" // Same redirect URI as above
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
getRefreshToken("4/0AVG7fiRupJp5GDCOgMDuOZQRD7Ac6uPR39Ask4E8hyCna8CFa33wDZhkeQGtuZ4qVNPyTw&scope=email%20profile%20https://www.googleapis.com/auth/gmail.send%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20openid&authuser=0&hd=somaiya.edu&prompt=consent");

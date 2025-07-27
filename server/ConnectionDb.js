const mongoose = require("mongoose");
require("dotenv").config();

exports.connectdb = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch(error => console.error("MongoDB connection error:", error));
};

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error!"));
db.once("open", () => {
  console.log("\nMongoDB Connection Established for Users!!!\n");
});

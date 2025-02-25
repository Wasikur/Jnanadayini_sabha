const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/dbConfig.js");
const cors = require("cors");
const path = require("path");


// Server
const app = express();

// Database
dbConnection();

// Cors
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Add allowed origins here
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow credentials if needed
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads")); // Adjust according to your folder structure

// Public path
app.use(express.static("public"));

// Read and parse body
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api", require("./routes/imageRoutes.js"));
app.use("/api/albums", require("./routes/albumRoutes.js"));
app.use("/api/carousel", require("./routes/cariouselRoutes.js"));
app.use("/api/leaders", require("./routes/leaderRoutes.js"));
app.use("/api/posts", require("./routes/postRoutes.js"));
app.use("/api/events", require("./routes/events.js"));
app.use("/api/contact", require("./routes/contactRoutes.js"));
app.use("/api/donationform", require("./routes/donationFormRoutes.js"));
app.use("/api/donations", require("./routes/donationRoutes.js"));
app.use("/api/notifications", require("./routes/notificationRoutes.js"));
app.use("/api/core-members", require("./routes/coreMembersRoutes.js"));
app.use("/api/executive-members", require("./routes/executiveMemberRoutes.js"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

// Listening PORT
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0',() => {
  console.log(`Server is listening to port ${port}`);
});

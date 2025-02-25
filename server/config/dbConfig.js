const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false); // Suppress Mongoose strictQuery warning
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB database connection established successfully!");
  } catch (error) {
    console.error("Database initialization error:", error);
    process.exit(1); // Exit the process if the DB fails to connect
  }
};

module.exports = dbConnection;

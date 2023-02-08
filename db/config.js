const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.DB_CNN);
    console.log("BD Online");
  } catch(error) {
    console.log(error);
    throw new Error("Database Init error");
  }
};

module.exports = {
  dbConnection
};

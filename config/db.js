const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const temp = config.get("testing_con_var");

const connectDB = async () => {
  console.log(` __db REMOVE test=${temp}`);
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("  __DB: database connected");
  } catch (err) {
    console.error(`  __DB: ${err.message}`);
    // Exit process with failure if database connection cannot be established
    process.exit(1);
  }
};

module.exports = connectDB;

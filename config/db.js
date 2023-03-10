const mongoose = require("mongoose");

let retries = 5;
let currentRetry = 0;
const createConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error.toString());
    if (currentRetry <= retries) {
      currentRetry++;
      console.log(`Retrying: ${currentRetry}`);
      createConnection();
    }
  }
};

module.exports = createConnection;

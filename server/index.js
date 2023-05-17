const { connect } = require("./src/utils/connectDB");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

connect();
const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on PORT http://localhost:${PORT}`);
});

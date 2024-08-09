const mongoose = require("mongoose");
const dotenv = require('dotenv');
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const DB = "mongodb+srv://imramagrawal:jaimongodb123@cluster0.r7lshib.mongodb.net/notes?retryWrites=true&w=majority";

mongoose.connect(DB)
  .then(() => { console.log("connection successful...") })
  .catch((err) => { console.log(err) });
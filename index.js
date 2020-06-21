const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const database = require("./data-access");

const router = require("./routes");

const result = dotenv.config({ path: "./config/.env" });

if (result.error) {
  console.log(result.error);
  throw result.error;
}

database.config();

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Listening on port : ${process.env.PORT || 5000}`)
);

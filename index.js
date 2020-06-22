const express = require("express");
const cors = require("cors");
const database = require("./data-access");

const router = require("./routes");

database.config();

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Listening on port : ${process.env.PORT || 5000}`)
);

const express = require("express");
const cors = require("cors");

const router = require("./routes");

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Listening on port : ${process.env.PORT || 3000}`)
);

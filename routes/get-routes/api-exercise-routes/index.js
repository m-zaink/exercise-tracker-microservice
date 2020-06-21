const express = require("express");
const router = express.Router();

const { logQueryValidator, userQueryValidator } = require("./middlewares");

router.get("/", (req, res) => {
  res.send("ROUTE GET(/api/exercise/)");
});

router.get("/users", (req, res) => {
  res.send("ROUTE GET(api/exercise/users)");
});

router.get("/user", userQueryValidator, (req, res) => {
  res.send("ROUTE GET(api/exercise/user)");
});

router.get("/log", logQueryValidator, (req, res) => {
  res.send("ROUTE GET(api/exercise/log)");
});

module.exports = router;

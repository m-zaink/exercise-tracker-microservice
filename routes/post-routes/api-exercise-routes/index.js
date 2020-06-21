const express = require("express");
const router = express.Router();

const {
  addUserBodyValidator,
  addExerciseBodyValidator,
} = require("./middlewares");

router.post("/", (req, res) => {
  res.send("ROUTE POST (/api/exercise/)");
});

router.post("/new-user", addUserBodyValidator, (req, res) => {
  res.send("ROUTE POST (api/exercise/new-user)");
});

// TODO: Update to add-exercise once freecodecamp validation is done.
router.post("/add", addExerciseBodyValidator, (req, res) => {
  res.send("ROUTE POST (api/exercise/add)");
});

module.exports = router;

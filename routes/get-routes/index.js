const express = require("express");
const router = express.Router();

const apiExerciseRouter = require("./api-exercise-routes");

// GET routes go here.

router.get("/", (req, res) => {
  res.send("Route GET (/) : Hello World");
});

router.use("/api/exercise", apiExerciseRouter);

module.exports = router;

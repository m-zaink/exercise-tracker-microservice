const express = require("express");
const router = express.Router();

const { User, Exercise } = require("../../../data-access/models/user-model");

const {
  addUserBodyValidator,
  addExerciseBodyValidator,
} = require("./middlewares");

router.post("/", (req, res) => {
  res.send("ROUTE POST (/api/exercise/)");
});

router.post("/new-user", addUserBodyValidator, async (req, res) => {
  const username = req.body.username;

  let user = await User.findOne({ username: username });
  if (user === null || user === undefined) {
    user = User({ username: username });
    user = await user.save();
    res.send(user);
  } else {
    res.statusCode = 400;
    res.send({
      error: "Username already taken.",
    });
  }
});

// TODO: Update to add-exercise once freecodecamp validation is done.
router.post("/add", addExerciseBodyValidator, async (req, res) => {
  const username = req.body.username;
  const userId = req.body.userId;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = new Date(req.body.date);

  const hasUsername = username !== null && username !== undefined;
  const hasUserId = userId !== null && userId !== undefined;

  let user;
  if (hasUsername) {
    user = await User.findOne({ username: username });
  }

  if (hasUserId) {
    user = await User.findById(userId);
  }

  user.logs.push(
    new Exercise({ description: description, duration: duration, date: date })
  );

  try {
    await user.save();
    res.send(user);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.send({
      error: "Sorry about that. We couldn't save your updates",
    });
  }
});

module.exports = router;

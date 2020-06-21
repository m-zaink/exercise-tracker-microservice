const express = require("express");
const router = express.Router();

const { User } = require("../../../data-access/models/user-model");

const {
  logQueryValidator,
  userQueryValidator,
  usersQueryValidator,
} = require("./middlewares");

router.get("/", (req, res) => {
  res.send("ROUTE GET(/api/exercise/)");
});

router.get("/users", usersQueryValidator, async (req, res) => {
  try {
    let limitParam = req.query.limit;

    limitParam = parseInt(limitParam);
    if (isNaN(limitParam)) limitParam = 25;

    let users = await User.find({}, { logs: 0 }).limit(limitParam);
    res.send(users);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.send({
      error: "Sorry. We couldn't respond to your request. Try again later.'",
    });
  }
});

router.get("/user", userQueryValidator, async (req, res) => {
  const usernameParam = req.query.username;
  const userIdParam = req.query.userId;

  // Validations go here

  const hasUsername =
    usernameParam !== undefined &&
    usernameParam !== null &&
    usernameParam.length > 0;
  const hasUserId =
    userIdParam !== undefined && userIdParam !== null && userIdParam.length > 0;

  try {
    let user;
    if (hasUserId) {
      user = await User.findById(userIdParam);
    }

    if (hasUsername) {
      user = await User.findOne({ username: usernameParam });
    }

    res.send(user);
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.send({
      error: "Sorry. We couldn't respond to your request. Try again later.'",
    });
  }
});

router.get("/log", logQueryValidator, async (req, res) => {
  const usernameParam = req.query.username;
  const userIdParam = req.query.userId;
  const fromDateParam = req.query.from;
  const toDateParam = req.query.to;
  const limitParam = req.query.limit;

  // Validations go here

  const hasUsername =
    usernameParam !== undefined &&
    usernameParam !== null &&
    usernameParam.length > 0;
  const hasUserId =
    userIdParam !== undefined && userIdParam !== null && userIdParam.length > 0;

  const hasFromDate = fromDateParam !== undefined && fromDateParam !== null;

  const hasToDate = toDateParam !== undefined && toDateParam !== null;
  const hasLimit = limitParam !== undefined && limitParam !== null;

  try {
    let user;
    if (hasUserId) {
      user = await User.findById(userIdParam);
    }

    if (hasUsername) {
      user = await User.findOne({ username: usernameParam });
    }

    if (user !== null) {
      let logs = user.logs;
      if (hasFromDate && hasToDate) {
        logs = [];
        const fromDate = new Date(fromDateParam);
        const toDate = new Date(toDateParam);
        for (let log in user.logs) {
          let logDate = new Date(user.logs[log].date);
          if (logDate >= fromDate && logDate <= toDate) {
            logs.push(user.logs[log]);
          }
        }
      } else if (hasFromDate) {
        logs = [];
        const fromDate = new Date(fromDateParam);
        for (let log in user.logs) {
          let logDate = new Date(user.logs[log].date);
          if (logDate >= fromDate) {
            logs.push(user.logs[log]);
          }
        }
      } else if (hasToDate) {
        logs = [];
        const toDate = new Date(toDateParam);
        for (let log in user.logs) {
          let lodDate = new Date(user.logs[log].date);
          if (logDate <= toDate) {
            logs.push(user.logs[log]);
          }
        }
      }

      if (hasLimit) {
        const limit = parseInt(limitParam);
        if (logs.length >= limit) {
          logs = logs.slice(0, limitParam);
        }
      }

      user.logs = logs;
      console.log(user.logs);
    }

    res.send(user);
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.send({
      error: "Sorry. We couldn't respond to your request. Try again later.'",
    });
  }
});

module.exports = router;

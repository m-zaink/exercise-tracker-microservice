// Middlewares for GET /api/exercise routes go here

const addUserBodyValidator = (req, res, next) => {
  const usernameParam = req.body.username;

  // Validations go here

  const hasUsernameParam =
    usernameParam !== undefined &&
    usernameParam !== null &&
    usernameParam.length > 0;

  if (!hasUsernameParam) {
    res.statusCode = 400;
    return res.send({
      error: "Usename cannot be missing or empty",
    });
  }

  next();
};
const addExerciseBodyValidator = (req, res, next) => {
  const usernameParam = req.body.username;
  const userIdParam = req.body.userId;
  const descriptionParam = req.body.description;
  const durationParam = req.body.duration;
  const dateParam = req.body.from;

  // Validations go here

  const hasUsernameParam =
    usernameParam !== undefined &&
    usernameParam !== null &&
    usernameParam.length > 0;
  const hasUserIdParam =
    userIdParam !== undefined && userIdParam !== null && userIdParam.length > 0;

  if (!hasUsernameParam && !hasUserIdParam) {
    res.statusCode = 400;
    return res.send({
      error: "Both username and user-id are missing. At least one is required.",
    });
  }
  const hasDurationParam =
    durationParam !== undefined && durationParam !== null;

  if (hasDurationParam) {
    if (durationParam.length === 0) {
      res.statusCode = 400;
      return res.send({
        error: "The 'duration' body-parameter is invalid (its empty).",
      });
    }

    const limit = Number(durationParam);

    if (isNaN(limit)) {
      res.statusCode = 400;
      return res.send({
        error: "The number under 'duration' body-parameter is invalid.",
      });
    }

    if (limit < 0) {
      res.statusCode = 400;
      return res.send({
        error:
          "The number under 'duration' body-parameter is invalid (negative numbers are not allowed for duration).",
      });
    }
  } else {
    res.statusCode = 400;
    return res.send({
      error: "The duration body-param is required",
    });
  }

  const hasDateParam = dateParam !== undefined && dateParam !== null;

  if (hasDateParam) {
    const date = new Date(dateParam);

    if (dateParam.length === 0 || date.toString() === "Invalid Date") {
      res.statusCode = 400;
      return res.send({
        error: "The date under 'date' query-parameter is invalid.",
      });
    }
  }

  next();
};

module.exports.addUserBodyValidator = addUserBodyValidator;
module.exports.addExerciseBodyValidator = addExerciseBodyValidator;

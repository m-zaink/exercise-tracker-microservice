// Middlewares for GET /api/exercise routes go here

const usersQueryValidator = (req, res, next) => {
  const limitParam = req.query.limit;

  const hasLimitParam = limitParam !== undefined && limitParam !== null;

  if (hasLimitParam) {
    if (limitParam.length === 0) {
      res.statusCode = 400;
      return res.send({
        error: "The 'limit' query-parameter is invalid (its empty).",
      });
    }

    const limit = Number(limitParam);

    if (isNaN(limit)) {
      res.statusCode = 400;
      return res.send({
        error: "The number under 'limit' query-parameter is invalid.",
      });
    }

    if (limit < 0) {
      res.statusCode = 400;
      return res.send({
        error:
          "The number under 'limit' query-parameter is invalid (negative numbers are not allowed for limit).",
      });
    }
  }

  next();
};

const userQueryValidator = (req, res, next) => {
  const usernameParam = req.query.username;
  const userIdParam = req.query.userId;

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
      error:
        "Both username and user-id are missing (or are empty). At least one is required.",
    });
  }

  next();
};

const logQueryValidator = (req, res, next) => {
  const usernameParam = req.query.username;
  const userIdParam = req.query.userId;
  const fromDateParam = req.query.from;
  const toDateParam = req.query.to;
  const limitParam = req.query.limit;

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

  // TODO: If both fromDate and toDate are present, check if fromDate <= toDate

  const hasFromDateParam =
    fromDateParam !== undefined && fromDateParam !== null;

  if (hasFromDateParam) {
    const fromDate = new Date(fromDateParam);

    if (fromDateParam.length === 0 || fromDate.toString() === "Invalid Date") {
      res.statusCode = 400;
      return res.send({
        error: "The date under 'from' query-parameter is invalid.",
      });
    }

    // TODO: Check if fromDate is within today.
  }

  const hasToDateParam = toDateParam !== undefined && toDateParam !== null;

  if (hasToDateParam) {
    const toDate = new Date(toDateParam);

    if (toDateParam.length === 0 || toDate.toString() === "Invalid Date") {
      res.statusCode = 400;
      return res.send({
        error: "The date under 'to' query-parameter is invalid.",
      });
    }
  }

  const hasLimitParam = limitParam !== undefined && limitParam !== null;

  if (hasLimitParam) {
    if (limitParam.length === 0) {
      res.statusCode = 400;
      return res.send({
        error: "The 'limit' query-parameter is invalid (its empty).",
      });
    }

    const limit = Number(limitParam);

    if (isNaN(limit)) {
      res.statusCode = 400;
      return res.send({
        error: "The number under 'limit' query-parameter is invalid.",
      });
    }

    if (limit < 0) {
      res.statusCode = 400;
      return res.send({
        error:
          "The number under 'limit' query-parameter is invalid (negative numbers are not allowed for limit).",
      });
    }
  }

  next();
};

module.exports.usersQueryValidator = usersQueryValidator;
module.exports.userQueryValidator = userQueryValidator;
module.exports.logQueryValidator = logQueryValidator;

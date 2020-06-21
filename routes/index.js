const express = require("express");
const router = express.Router();

const getRouter = require("./get-routes");
const postRouter = require("./post-routes");

router.use(getRouter);
router.use(postRouter);

module.exports = router;

const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const todoRoute = require("./todo.route");

router.use(userRoute);
router.use(todoRoute);

module.exports = router;
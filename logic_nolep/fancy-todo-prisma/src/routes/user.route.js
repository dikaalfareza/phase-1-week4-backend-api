const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.route("/users")
    .get(userController.getUsers)
    .post(userController.createUser);

router.route("/users/:id")
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
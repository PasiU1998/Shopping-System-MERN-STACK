const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const controllers = require("../../controllers/userController")

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router
    .route("/register")
    .post(
        controllers.registerUser
    );

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router
    .route("/login")
    .post(
        controllers.login
    );

// @route POST api/users/allUsers
// @desc get all users
// @access private(admin)
router
    .route("/allUsers")
    .get(
        controllers.findAllUsers
    );

// @route POST api/users/getUser
// @desc get a user by id
// @access private(admin)
router
    .route("/getUser/:id")
    .get(
        controllers.findUser
    );

// @route POST api/users/updateUser/id
// @desc Update user
// @access private(admin)
router
    .route("/updateUser/:id")
    .put(
        controllers.updateUser
    );

// @route POST api/users/deleteUser/id
// @desc Delete a user
// @access private(admin)
router
    .route("/deleteUser/:id")
    .delete(
        controllers.deleteUser
    );

// @route POST api/users/updatePassword/id
// @desc update the password of the user
// @access public
router
    .route("/updatePassword/:id")
    .put(
        controllers.updatePassword
    );

// @route POST api/users/findUserByRole
// @get users according to user role
// @access private
router
    .route("/findUsersByRole")
    .post(
        controllers.findUsersByRole
    );



module.exports = router;

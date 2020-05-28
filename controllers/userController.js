const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateUpdateInput = require("../validation/updateUser");
const validateUpdatePassword = require("../validation/updatePassword")

// Load User model
const User = require("../models/User");
const services = require("../services/userService")

//Register New User
module.exports.registerUser =async (req,res) => {

    // Validation
    const { errors, isValid } = validateRegisterInput(req.body);
    const user = await services.registerUser(req.body,res)

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
};

//Login User
module.exports.login = async (req,res) => {

    //Validation
    const { errors, isValid } = validateLoginInput(req.body);
    const user = await services.login(req.body,res)

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
};

//Get All Users
module.exports.findAllUsers = async (req,res) => {
    const users = await services.findAllUsers(req.body,res);

};

//Find User By Id
module.exports.findUser = async (req,res) => {
    const user = await services.findUser(req.params.id,req.body,res);

};

//Update User
module.exports.updateUser = async (req,res) => {
    const { errors, isValid } = validateUpdateInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const user = await services.updateUser(req.params.id,req.body,res);

};

//Delete User
module.exports.deleteUser = async (req,res) => {
    const user = await services.deleteUser(req.params.id,res);
};

//update password
module.exports.updatePassword = async (req,res) => {
    const { errors, isValid } = validateUpdatePassword(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = await services.updatePassword(req.params.id,req.body,res);
};


//Get users according to user role
module.exports.findUsersByRole = async (req,res) => {
    const users = await services.findUsersByRole(req.body,res);

};

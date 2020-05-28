const express = require("express");
const router = express.Router();

const controllers = require("../../controllers/cartController");

// @route GET api/carts/all
// @desc Get All carts
// @access Public
router
    .route("/all")
    .get(
        controllers.findAllCartItems
    );

// @route POST api/carts/store
// @desc Create cart
// @access Public
router
    .route("/store")
    .post(
        controllers.createCart
    );

// @route GET api/carts/get/:id
// @desc Get an carts
// @access Public
router
    .route("/get/:id")
    .get(
        controllers.findCartByID
    );

// @route PUT api/carts/update/:id
// @desc Update an cart
// @access Public
router
    .route("/update/:id")
    .put(
        controllers.updateCart,
    );

// @route DELETE api/carts/delete/:id
// @desc Delete an cart
// @access Public
router
    .route("/delete/:id")
    .delete(
        controllers.deleteCart,
    );

// @route GET api/carts/user/get/:id
// @desc Get an carts
// @access Public
router
    .route("/user/get/:id")
    .get(
        controllers.findCartByUserID
    );

module.exports = router;

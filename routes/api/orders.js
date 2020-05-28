const express = require("express");
const router = express.Router();

const controllers = require("../../controllers/orderController");

// @route GET api/orders/all
// @desc Get All Orders
// @access Public
router
    .route("/all")
    .get(
        controllers.findAllOrders
    );

// @route POST api/orders/store
// @desc Create order
// @access Public
router
    .route("/store")
    .post(
        controllers.createOrder
    );

// @route GET api/orders/get/:id
// @desc Get an Order
// @access Public
router
    .route("/get/:id")
    .get(
        controllers.findOrderByID
    );

// @route PUT api/orders/update/:id
// @desc Update an Order
// @access Public
router
    .route("/update/:id")
    .put(
        controllers.updateOrder,
    );

// @route DELETE api/orders/delete/:id
// @desc Delete an Order
// @access Public
router
    .route("/delete/:id")
    .delete(
        controllers.deleteOrder,
    );

// @route GET api/orders/user/get/:id
// @desc Get orders
// @access Public
router
    .route("/user/get/:id")
    .get(
        controllers.findOrdersByUserID
    );

module.exports = router;

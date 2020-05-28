// Load Cart service
const services = require("../services/cartService");

// Retrieve and return all Carts from the database.
module.exports.findAllCartItems =async (req, res) => {

    const carts = await services.findAllCartItems(req.body, res);
};

// Create and Save a new Cart
module.exports.createCart =async (req, res) => {

    const cart = await services.createCart(req.body, res);
};


// Find a single Cart with a id
module.exports.findCartByID =async (req, res) => {

    const cart = await services.findCartByID(req.params.id, req.body, res);
};

// Update a Cart identified by the id in the request
module.exports.updateCart =async (req, res) => {

    const cart = await services.updateCart(req.params.id, req.body, res);
};

// Delete a Cart with the specified id in the request
exports.deleteCart =async (req, res) => {

    const cart = await services.deleteCart(req.params.id, req.body, res);
};

// Find a single Cart with a user_id
module.exports.findCartByUserID =async (req, res) => {

    const cart = await services.findCartByUserID(req.params.id, req.body, res);
};

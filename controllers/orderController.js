// Load input validation
const validateOrderInput = require("../validation/orderInput");

// Load Order service
const services = require("../services/orderService");

// Retrieve and return all orders from the database.
module.exports.findAllOrders =async (req, res) => {

    const orders = await services.findAllOrders(req.body, res);
};

// Create and Save a new Order
module.exports.createOrder =async (req, res) => {

    // Validation
    const { errors, isValid } = validateOrderInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const order = await services.createOrder(req.body, res);
};


// Find a single order with a id
module.exports.findOrderByID =async (req, res) => {

    const order = await services.findOrderByID(req.params.id, req.body, res);
};

// Update an Order identified by the id in the request
module.exports.updateOrder =async (req, res) => {

    // Validation
    const { errors, isValid } = validateOrderInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const order = await services.updateOrder(req.params.id, req.body, res);

};

// Delete an Order with the specified id in the request
exports.deleteOrder =async (req, res) => {

    const order = await services.deleteOrder(req.params.id, req.body, res);
};

// Find Orders with a user_id
module.exports.findOrdersByUserID =async (req, res) => {

    const order = await services.findOrdersByUserID(req.params.id, req.body, res);
};

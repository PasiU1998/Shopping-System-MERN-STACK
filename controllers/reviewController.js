// Load Cart service
const services = require("../services/reviewService");

// Retrieve and return all Reviews from the database.
module.exports.findAllReviews =async (req, res) => {

    const carts = await services.findAllReviews(req.body, res);
};

// Create and Save a new Review
module.exports.createReview =async (req, res) => {

    const cart = await services.createReview(req.body, res);
};


// Find a single Cart with a id
module.exports.findReviewByID =async (req, res) => {

    const cart = await services.findReviewByID(req.params.id, req.body, res);
};

// Update a Review identified by the id in the request
module.exports.updateReview =async (req, res) => {

    const cart = await services.updateReview(req.params.id, req.body, res);
};

// Delete a Review with the specified id in the request
exports.deleteReview =async (req, res) => {

    const cart = await services.deleteReview(req.params.id, req.body, res);
};

// Find Reviews with a product_id
module.exports.findReviewsByProductID =async (req, res) => {

    const cart = await services.findReviewsByProductID(req.params.id, req.body, res);
};

const express = require("express");
const router = express.Router();

const controllers = require("../../controllers/reviewController");

// @route GET api/reviews/all
// @desc Get All reviews
// @access Public
router
    .route("/all")
    .get(
        controllers.findAllReviews
    );

// @route POST api/reviews/store
// @desc Create review
// @access Public
router
    .route("/store")
    .post(
        controllers.createReview
    );

// @route GET api/reviews/get/:id
// @desc Get an reviews
// @access Public
router
    .route("/get/:id")
    .get(
        controllers.findReviewByID
    );

// @route PUT api/reviews/update/:id
// @desc Update an review
// @access Public
router
    .route("/update/:id")
    .put(
        controllers.updateReview,
    );

// @route DELETE api/reviews/delete/:id
// @desc Delete an review
// @access Public
router
    .route("/delete/:id")
    .delete(
        controllers.deleteReview,
    );

// @route GET api/reviews/products/get/:id
// @desc Get an products
// @access Public
router
    .route("/products/get/:id")
    .get(
        controllers.findReviewsByProductID
    );

module.exports = router;

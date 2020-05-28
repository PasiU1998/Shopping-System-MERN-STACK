const express = require("express");

// Load Cart model
const Review = require("../models/Review");

//Find all Carts
module.exports.findAllReviews =async (body,res) => {

    return Review.find()
        .then(reviews => res.json(reviews))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while getting list of reviews."
            });
        });

};

//Create New Review
module.exports.createReview =async (body, res) => {

    // Create a new Review
    const review = new Review({
        rating: body.rating,
        comment: body.comment,
        user_id: body.user_id ,
        product_id: body.product_id
    });

    // Save review in the database
    review.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating new review."
        });
    });
};

//Find one review
module.exports.findReviewByID =async (id, body,res) => {

    Review.findById(id)
        .then(review => {
            if(!review) {
                return res.status(404).send({
                    message: "Review not found"
                });
            }
            res.send(review);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Review not found"
            });
        }
        return res.status(500).send({
            message: "Error getting review"
        });
    });

};

//Update a review
module.exports.updateReview =async (id, body,res) => {

    // Find review and update it with the request body
    Review.findByIdAndUpdate(id, {
        rating: body.rating,
        comment: body.comment,
        user_id: body.user_id ,
        product_id: body.product_id
    }, {new: true})
        .then(review => {
            if(!review) {
                return res.status(404).send({
                    message: "Review not found"
                });
            }
            res.send(review);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Review not found"
            });
        }
        return res.status(500).send({
            message: "Error updating review"
        });
    });
};

//Delete a review
module.exports.deleteReview =async (id, body,res) => {

    Review.findByIdAndRemove(id)
        .then(review => {
            if(!review) {
                return res.status(404).send({
                    message: "Review not found"
                });
            }
            res.send({message: "Review deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Review not found"
            });
        }
        return res.status(500).send({
            message: "Could not delete review"
        });
    });
};

//get reviews by product_id
module.exports.findReviewsByProductID = async (id, body,res) => {

    let query = {
        product_id: id,
    };

    Review.find(query)
        .then(reviews => {
            if(!reviews) {
                return res.status(404).send({
                    message: "Review not found for this user "
                });
            }
            res.send(reviews);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Review not found for this user"
            });
        }
        return res.status(500).send({
            message: "Error getting review for this user"
        });
    });
};

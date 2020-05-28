const express = require('express');

//  Import WishList Module
const WishList = require('../models/WishList');

// Get All Wishlists
module.exports.findAllWishlist = async (body, res) => {

    return WishList.find()
        .then(wishlists => res.json(wishlists))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Server error"
            });
        });

};

// Create a wishlist
module.exports.createWishList = async (body, res) => {

    const newWishList = new WishList({
        user_id: body.user_id,
        products: body.products
    });

    newWishList.save()
        .then(data => {
            res.send(data)
                .catch(err => {
                    res.status(500)
                        .send({message: 'Server Error'});
                });
        });
};

//Update existing wishlist
module.exports.updateWishListService = async (id, body, res) => {

    WishList.findByIdAndUpdate(id, {
        user_id: body.user_id ? body.user_id : "",
        products: body.products
    }, {new: true})
        .then(wishlist => {
            if (!wishlist) {
                return res.status(404).send({
                    message: "Wish List Not Found"
                });
            }
            res.send(wishlist);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Wish List Not Found"
            });
        }
        return res.status(500).send({
            message: "Server Error"
        });
    });
};

module.exports.deleteWishlist = async (id, body, res) => {
    WishList.findByIdAndRemove(id)
        .then(wishlist => {
            if (!wishlist) {
                return res.status(404).send({
                    message: "Wish List not found"
                });
            }
            res.send({message: "Wish List deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Wish List not found"
            });
        }
        return res.status(500).send({
            message: 'Server Error'
        });
    });
};

//get cart by user_id
module.exports.getWishListByUser = async (id, body,res) => {

    let query = {
        user_id: id,
    };

    WishList.findOne(query)
        .then(wishhlist => {
            if(!wishhlist) {
                return res.status(404).send({
                    message: "Wish List not found for this user "
                });
            }
            res.send(wishhlist);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Wish List not found for this user"
            });
        }
        return res.status(500).send({
            message: "Server Error"
        });
    });
};

const express = require("express");

// Load Cart model
const Cart = require("../models/Cart");

//Find all Carts
module.exports.findAllCartItems =async (body,res) => {

    return Cart.find()
        .then(carts => res.json(carts))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while getting list of carts."
            });
        });

};

//Create New cart
module.exports.createCart =async (body, res) => {

    // Create a new cart
    const cart = new Cart({
        user_id: body.user_id,
        products: body.products
    });

    // Save cart in the database
    cart.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating new cart."
        });
    });
};

//Find one cart
module.exports.findCartByID =async (id, body,res) => {

    Cart.findById(id)
        .then(cart => {
            if(!cart) {
                return res.status(404).send({
                    message: "Cart not found"
                });
            }
            res.send(cart);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cart not found"
            });
        }
        return res.status(500).send({
            message: "Error getting cart"
        });
    });

};

//Update a cart
module.exports.updateCart =async (id, body,res) => {

    // Find cart and update it with the request body
    Cart.findByIdAndUpdate(id, {
        user_id: body.user_id ? body.user_id : "",
        products: body.products
    }, {new: true})
        .then(cart => {
            if(!cart) {
                return res.status(404).send({
                    message: "Cart not found"
                });
            }
            res.send(cart);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cart not found"
            });
        }
        return res.status(500).send({
            message: "Error updating cart"
        });
    });
};

//Delete a cart
module.exports.deleteCart =async (id, body,res) => {

    Cart.findByIdAndRemove(id)
        .then(cart => {
            if(!cart) {
                return res.status(404).send({
                    message: "Cart not found"
                });
            }
            res.send({message: "Cart deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Cart not found"
            });
        }
        return res.status(500).send({
            message: "Could not delete cart"
        });
    });
};

//get cart by user_id
module.exports.findCartByUserID = async (id, body,res) => {

    let query = {
        user_id: id,
    };

    Cart.findOne(query)
        .then(cart => {
            if(!cart) {
                return res.status(404).send({
                    message: "Cart not found for this user "
                });
            }
            res.send(cart);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cart not found for this user"
            });
        }
        return res.status(500).send({
            message: "Error getting cart for this user"
        });
    });
};

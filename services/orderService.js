const express = require("express");

// Load Order model
const Order = require("../models/Order");

//Find all Orders
module.exports.findAllOrders =async (body,res) => {

    return Order.find()
        .then(orders => res.json(orders))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while getting list of orders."
            });
        });

};

//Create New Order
module.exports.createOrder =async (body, res) => {

    // Create a new Order
    const order = new Order({
        total: body.total,
        status: body.status,
        payment_type: body.payment_type,
        card_number: body.card_number ? body.card_number : "",
        user_id: body.user_id ? body.user_id : "",
        products: body.products,
        billing_address: body.billing_address,
        billing_city: body.billing_city
    });

    // Save order in the database
    order.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating new order."
        });
    });
};

//Find one Order
module.exports.findOrderByID =async (id, body,res) => {

    Order.findById(id)
        .then(order => {
            if(!order) {
                return res.status(404).send({
                    message: "Order not found with id " + id
                });
            }
            res.send(order);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + id
            });
        }
        return res.status(500).send({
            message: "Error getting order with id " + id
        });
    });

};

//Update an Order
module.exports.updateOrder =async (id, body,res) => {

    // Find order and update it with the request body
    Order.findByIdAndUpdate(id, {
        total: body.total,
        status: body.status,
        payment_type: body.payment_type,
        card_number: body.card_number ? body.card_number : "",
        user_id: body.user_id ? body.user_id : "",
        products: body.products,
        billing_address: body.billing_address,
        billing_city: body.billing_city
    }, {new: true})
        .then(order => {
            if(!order) {
                return res.status(404).send({
                    message: "Order not found with id " + id
                });
            }
            res.send(order);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + id
            });
        }
        return res.status(500).send({
            message: "Error updating order with id " + id
        });
    });
};

//Delete an Order
module.exports.deleteOrder =async (id, body,res) => {

    Order.findByIdAndRemove(id)
        .then(order => {
            if(!order) {
                return res.status(404).send({
                    message: "Order not found with id " + id
                });
            }
            res.send({message: "Order deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with id " + id
            });
        }
        return res.status(500).send({
            message: "Could not delete order with id " + id
        });
    });
};

//get orders by user_id
module.exports.findOrdersByUserID = async (id, body,res) => {

    let query = {
        user_id: id,
    };

    Order.find(query)
        .then(orders => {
            if(!orders) {
                return res.status(404).send({
                    message: "Orders not found for this user "
                });
            }
            res.send(orders);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Orders not found for this user"
            });
        }
        return res.status(500).send({
            message: "Error getting orders for this user"
        });
    });
};

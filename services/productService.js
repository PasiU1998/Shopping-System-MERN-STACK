const express = require("express");

//Load Model
const product = require("../models/Product");

//Read All Product
const findAllproduct = () => {

    return product.find()
        .then((products) => {return products})
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Something went wrong while getting list of Products."
            });

        });
};

//Insert Product
const insertProduct = (body) => {

    return new Promise((resolve, reject) => {

        const products = {
            productName : body.productName ,
            productDescription : body.productDescription ,
            productPrice : body.productPrice ,
            productStockQuantity : body.productStockQuantity ,
            productDiscount : body.productDiscount ,
            productColor : body.productColor ,
            productAvailableSize : body.productAvailableSize,
            productImage: body.productImg,
            category_id : body.category_id ? body.category_id : "",
            user_id: body.user_id ? body.user_id : "",

        };

        product.create(products, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        });
    });
};

//update product
const updateProduct = (id, body , res) =>{

    product.findByIdAndUpdate(id , {
        productName : body.productName ,
        productDescription : body.productDescription ,
        productPrice : body.productPrice ,
        productStockQuantity : body.productStockQuantity ,
        productDiscount : body.productDiscount ,
        productColor : body.productColor ,
        productAvailableSize : body.productAvailableSize,
        productImage : body.productImg,
        user_id: body.user_id ? body.user_id : "",
        category_id : body.category_id ? body.category_id : ""

    }, {new : true})
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Product not found with id " + id
                });
            }
            res.send(product);
        }).catch(err => {

        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product  not found with id " + id
            });
        }
        return res.status(500).send({
            message: "Error updating Product with id " + id
        });

    });

};


//find a product
const findOneproduct =  (id,res) => {

    product.findById(id)
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Product not found with id " + id
                });
            }
            res.send(product);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product not found with id " + id
            });
        }
        return res.status(500).send({
            message: "Error getting product with id " + id
        });
    });

};

//Delete a Product
const deleteProduct = (id,res) => {

    product.findByIdAndRemove(id)
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Product not found with id " + id
                });
            }
            res.send({message: "Product deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "product not found with id " + id
            });
        }
        return res.status(500).send({
            message: "Could not delete Product with id " + id
        });
    });
};

//Find Product View by Product Manager Id
const findViewByproductManager = (id , res) => {
    let query = {
        user_id : id,
    };

    product.find(query)
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Review not found for this user "
                });
            }
            res.send(product);
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

const findViewByCatrgoryId = (id , res) => {
    let query = {
        category_id : id,
    };

    product.find(query)
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Review not fond this category "
                });
            }
            res.send(product);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Review not found for this category"
            });
        }
        return res.status(500).send({
            message: "Error getting review for this category"
        });
    });

};

module.exports = {
    findAllproduct: () => findAllproduct(),
    deleteProduct: (id,res) => deleteProduct(id,res),
    insertProduct: (body) => insertProduct(body),
    updateProduct: (id, body , res) => updateProduct(id, body , res),
    findOneproduct: (id , res) => findOneproduct(id , res),
    findViewByproductManager: (id, res) => findViewByproductManager(id , res),
    findViewByCatrgoryId: (id,res) => findViewByCatrgoryId(id,res)
};

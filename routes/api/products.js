const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const productController = require("../../controllers/productController");

//Image Upload ====================================

//Set Storage
const storage = multer.diskStorage({
    destination : 'client/public/uploads',
    filename : function (req , file , cb) {
        cb(null , file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Create Upload variable
const upload = multer({
    storage : storage
});

//===================================================

// @route GET api/products/allproducts
// @desc Get All Products
// @access Public
router
    .route("/allproducts")
    .get(
        productController.findAllProducts
    );

// @route GET api/products/oneProduct
// @desc Get one Product
// @access Public
router
    .route("/oneProduct/:id")
    .get(
        productController.findOneProduct
    );


// @route POST api/products/insert
// @desc Insert product
// @access Public
router
    .route("/insert")
    .post(
       upload.single("productImg"),
       productController.insertProduct
    );


// @route PUT api/products/update/:id
// @desc Update an Product
// @access Public
router
    .route("/update/:id")
    .put(
        upload.single("productImg"),
        productController.updateProduct
    );


// @route DELETE api/products/delete/:id
// @desc Delete an Product
// @access Public
router
    .route("/delete/:id")
    .delete(
       productController.deleteProduct
    );


// @route GET api/products/productManager/:id
// @desc Get product sorted by productManager
// @access Public
router
    .route("/productManager/:id")
    .get(
        productController.findViewByProductManager
    );

// @route GET api/products/Category/:id
// @desc Get product sorted by Category
// @access Public
router
    .route("/Category/:id")
    .get(
        productController.findViewByCategoryId
    );




module.exports = router;

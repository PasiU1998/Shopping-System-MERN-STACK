const express = require('express');
const router = express.Router();

const categoryController = require('../../controllers/categoryController');

// @Route   GET api/categories/getall
// @Desc    Returns all the categories
// @Access  Public
router
    .route('/getall')
    .get(categoryController.getAllCategories
    );

// @route POST api/carts/store
// @desc Create cart
// @access Public
router
    .route("/store")
    .post(
        categoryController.insertCategory
    );


//@Route    DELETE api/categories/:_id
//@Desc     Delete category
//@Access   Public
router
    .route('/delete/:id')
    .delete(
      categoryController.deleteProduct
    );

//@Route    GET api/categories/:id
//@Desc     Find a particular category
//@Access   Public
router
    .route('/find/:id')
    .get(
        categoryController.findCategory
    );


//@Route    UPDATE api/categories/:id
//@Desc     Update a particular category
//@Access   Public
router
        .route('/update/:id')
    .put(
      categoryController.updateCategory
    );

module.exports = router;

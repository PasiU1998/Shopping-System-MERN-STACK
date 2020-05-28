const express = require('express');
const router = express.Router();
const Controller = require('../../controllers/wishlistController');

// @Route   GET api/wishlists/getall
// @Desc    Get Every Wishlist
// @Access  Public
router
    .route('/getall')
    .get(
       Controller.getWishLists
    );


// // @Route   POST api/wishlists/add
// // @Desc    Create wishlist
// // @Access  Public
router
    .route('/add')
    .post(
        Controller.createWishList
    );

// @Route   PUT api/wishlists/update/:id
// @Desc    Update wishlist
// @Access  Public
router
    .route('/update/:id')
    .put(
        Controller.updateWishList
    );

// @Route   DELETE api/wishlists/delete/:id
// @Desc    Delete Wishlist
// @Access  Public
router
    .route('/delete/:id')
    .delete(
        Controller.deleteWishList
    );

// @Route   GET api/wishlists/user/:id
// @Desc    Get User's Wishlist
// @Access  Public
router
    .route('/user/:id')
    .get(
    Controller.getWishListByUser
    );

module.exports = router;

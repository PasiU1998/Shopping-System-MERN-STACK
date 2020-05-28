// Import service of Wish List
const services = require('../services/wishlistsService');

module.exports.getWishLists = async (req, res) =>{
    const wishLists = await services.findAllWishlist(req.body, res);
};

module.exports.createWishList = async (req, res) => {
    const wishList = await services.createWishList(req.body, res);
};

module.exports.updateWishList = async (req, res) => {
  const wishList = await services.updateWishListService(req.params.id, req.body, res);
};

module.exports.deleteWishList = async (req, res) =>{
  const wishList = await services.deleteWishlist(req.params.id, req.body, res) ;
};

module.exports.getWishListByUser = async (req, res) =>  {
  const wishList = await services.getWishListByUser(req.params.id, req.body, res);
};

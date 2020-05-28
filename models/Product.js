const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

//create Schema
const ProductSchema = new Schema(
    {
        productName : {
            type : String ,
            require : true
        },

        productDescription :{
            type: String ,
            require: true
        },

        productPrice :  {
            type : Number,
            require : true
        },

        productStockQuantity : {
            type : Number ,
            require : false
        },

        productDiscount : {
            type : Number ,
            require : false
        },

        productColor : {
            type :String ,
            require : false
        },

        productAvailableSize : {
            type : String,
            require : false
        },

        productImage : {
            type : String,
            require : false
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"

        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"

        },
    },

{ timestamps: true },

);

module.exports = Product = mongoose.model("product" , ProductSchema);


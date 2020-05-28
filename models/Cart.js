const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const CartSchema = new Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        products: [{
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true,
            },
            qty: {
                type: Number,
                required: true,
                default: 1,
            },
            price:{
                type: Number,
                required: true,
            },
            discount:{
                type: Number,
                default: 0,
            },
            total:{
                type: Number,
                required: true,
            }
        }],

    },
    { timestamps: true },
);

module.exports = Cart = mongoose.model("cart", CartSchema);

const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        total: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        payment_type: {
            type: String,
            required: true
        },
        card_number:{
            type: String,
            required: false
        },
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
        billing_address: {
          type: String,
          required: true,
        },
        billing_city: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = Order = mongoose.model("order", OrderSchema);

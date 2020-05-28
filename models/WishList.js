const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectID;

const wishListSchema = new Schema({
        user_id: {
            type: ObjectId,
            ref: 'users',
            required: true
        },
        products: [{
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            }
        }

        ]

    },
    {timestamps: true}
);

module.exports = WishList = mongoose.model('WishList', wishListSchema);

const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
    {
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true
        },

    },
    { timestamps: true },
);

module.exports = Review = mongoose.model("review", ReviewSchema);

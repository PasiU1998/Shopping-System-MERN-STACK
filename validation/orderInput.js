const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCreateOrderInput(data) {
    let errors = {};

    // Convert empty fields to an empty string to validator functions
    // data.total = !isEmpty(data.total) ? data.total : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    data.payment_type = !isEmpty(data.payment_type) ? data.payment_type : "";
    data.card_number = !isEmpty(data.card_number) ? data.card_number : "";
    data.billing_address = !isEmpty(data.billing_address) ? data.billing_address : "";
    data.billing_city = !isEmpty(data.billing_city) ? data.billing_city : "";

    // status checks
    if (Validator.isEmpty(data.status)) {
        errors.status = "Status is required";
    }

    //payment_type checks
    if (Validator.isEmpty(data.payment_type)) {
        errors.payment_type = "Payment Type is required";
    } else {
        //credit card check
        if(data.payment_type == "Credit Card"){
            if (Validator.isEmpty(data.card_number)) {
                errors.card_number = "Card Number is required";
            }
        }
    }

    //billing_address checks
    if (Validator.isEmpty(data.billing_address)) {
        errors.billing_address = "Billing Address field is required";
    }

    //billing_city checks
    if (Validator.isEmpty(data.billing_city)) {
        errors.billing_city = "Billing City field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUpdateInput(data) {
    let errors = {};

    // Convert empty fields to an empty string to validator functions
    data.name = !isEmpty(data.name) ? data.name : "";

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

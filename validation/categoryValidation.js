const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCategoryData(data) {

    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";

    //Checking whether title is empty
    if(Validator.isEmpty(data.title)){
        errors.title = "Category title is required";
    }

    return{
        errors,
        isValid : isEmpty(errors)
    }
};

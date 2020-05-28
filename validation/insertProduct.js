const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports =  function validateInsertProduct (data) {

    let erros = {};

    data.productName = !isEmpty(data.productName) ? data.productName : "" ;
    data.productDescription = !isEmpty(data.productDescription) ? data.productDescription : "";
    data.productPrice = !isEmpty(data.productPrice) ? data.productPrice : "";
    data.productStockQuantity = !isEmpty(data.productStockQuantity) ? data.productStockQuantity : "";

    if(Validator.isEmpty(data.productName)){
        erros.productName = "Product Name field  Required"
    }
    if(Validator.isEmpty(data.productDescription)){
        erros.productDescription = "Product Description field  Required"
    }
    if(Validator.isEmpty(data.productPrice)){
        erros.productPrice = "Product Price field  Required"
    }
    if(Validator.isEmpty(data.productStockQuantity)){
        erros.productStockQuantity = "Product Quantity field  Required"
    }


    return {
        erros,
        isValid: isEmpty(erros)
    };


}

//Validating inputs
const categoryValidate = require('../validation/categoryValidation');

//Load category services
const categoryServices = require('../services/categoryService');

module.exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryServices.getAllCategories();
        res.send(categories)
    } catch (error) {
        res.status(400).send(error);
    }
};

//Insert category
module.exports.insertCategory = async (req, res) => {

    const {errors, isValid} = categoryValidate(req.body);

    if (!isValid) {
        res.status(400)
            .json(errors);
    }

    try {
        const category = await categoryServices.insertCategory(req.body);
        res.send(category);
    } catch (err) {
        res.status(400)
            .json(err);
    }
};

//Find particular Category
module.exports.findCategory = async (req, res) => {
    try {
        const category = await categoryServices.findCategory(req.params.id, res);
    } catch (err) {
        res.status(400)
            .json(err);
    }
};


//Delete a category
module.exports.deleteProduct = async (req, res) => {

    try {
        const category = await categoryServices.deleteCategory(req.params.id, res);

    } catch (err) {
        res
            .status(400)
            .json(err);
    }
};


module.exports.updateCategory = async (req, res) => {
    const {errors, isValid} = categoryValidate(req.body);

    if (!isValid) {
        res.status(400)
            .json(errors);
    }

    try {
        const category = await categoryServices.updateCategory(req.params.id, req.body, res);
    } catch (err) {
        res.status(400)
            .json(err);
    }
};

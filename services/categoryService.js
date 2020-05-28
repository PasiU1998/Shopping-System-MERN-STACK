//Load Model
const Category = require("../models/Category");

//Read All Product
const getAllCategories = () => {

    return Category.find()
        .then((categories) => {
            return categories
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Server Error"
            });

        });
};


const insertCategory = (body) => {

    return new Promise((resolve, reject) => {
        const newCategory = {
            title: body.title
        };

        Category.create(newCategory, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        });
    });


};


//update categories
const updateCategory = (id, body, res) => {

    Category.findByIdAndUpdate(id, {

        title: body.title

    }, {new: true})
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: 'Category not found'
                });
            }
            res.send(category);
        }).catch(err => {

        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'Category not found'
            });
        }

        return res.status(500).json({
            message: 'Server Error'
        });

    });

};


const findCategory = (id, res) => {

    Category.findById(id)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found"
                });
            }
            res.send(category);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found"
            });
        }
        return res.status(500).send({
            message: "Server error"
        });
    });

};


const deleteCategory = (id, res) => {

    Category.findByIdAndRemove(id)
        .then(category => {
            if (!category) {
                return res.status(404).send({message: "Category not found"});
            }
            res.send({message: "Category successfully deleted"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res
                .status(404)
                .send({message: "Category not found"});
        }
        return res
            .status(500)
            .json({message: "Server Error"});
    });
};

module.exports = {
    getAllCategories: () => getAllCategories(),
    deleteCategory: (id, res) => deleteCategory(id, res),
    insertCategory: (body) => insertCategory(body),
    updateCategory: (id, body, res) => updateCategory(id, body, res),
    findCategory: (id, res) => findCategory(id, res)
};

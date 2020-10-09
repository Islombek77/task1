const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String
});

const Category = mongoose.model('Category', categorySchema);

function validateCategory(category) {
    const bookSchema = {
        name: Joi.string().required().min(3)
    };

    return Joi.validate(category, bookSchema);
}

exports.Category = Category;
exports.categorySchema = categorySchema;
exports.validate = validateCategory;
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const {categorySchema, Category } = require('./category');


const Course = mongoose.model('Course', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: categorySchema,
        required: true
    },
    trainer: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        required: true
    },
    tags: [String],

}));

function validateCourse(course) {
    const schema = {
        title: Joi.string().min(5).max(255).required(),
        categoryId: Joi.string().required(),
        trainer: Joi.string().required(),
        status: Joi.string().required(),
        tags: Joi.array().items(Joi.string())
    };

    return Joi.validate(course, schema);
}

exports.Course = Course;
exports.validate = validateCourse;
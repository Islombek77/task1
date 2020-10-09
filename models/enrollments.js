const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const Course = require('./courses');
const Customer = require('./customer');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const customerSchema = new  mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});  

const courseSchema = new mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true 
    }
});

const enrollmentScehma = new mongoose.Schema({
    customer: customerSchema,
    course: courseSchema,
    courseFee: {
        type: Number,
        required: true
    },
    dateStart: String
});

const Enrollment = mongoose.model('Enrollment', enrollmentScehma);

function validateEnrollment(enrollment) {
    const schema = {
        customerId: Joi.string().required(),
        courseId: Joi.string().required(),
        courseFee: Joi.number().required(),
        dateStart: Joi.string().required()
    }

    return Joi.validate(enrollment, schema);
}

exports.Enrollment = Enrollment;
exports.validate = validateEnrollment;

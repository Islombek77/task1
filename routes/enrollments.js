const express = require('express');
const {Enrollment, validate} = require('../models/enrollments');
const { request, response } = require('express');
const { Customer } = require('../models/customer');
const { Course } = require('../models/courses');
const router = express.Router();

router.get('/', async(request, response) => {
    let enrollments = await Enrollment.find().sort('name');
    response.send(enrollments);
});

router.get('/:id', async(request, response) => {
    let enrollment = await Enrollment.findById(request.params.id);
    if(!enrollment)
        return response.status(404).send('Customer not found');
    
    response.send(enrollment);
});

router.post('/', async (request, response) => {
    
    const {error} = validate(request.body);
    if(error)
        return response.status(400).send(error.details[0].message);

    const customer = await Customer.findById(request.body.customerId);
    if(!customer) 
        return response.status(404).send(error.details[0].message);
    const course = await Course.findById(request.body.courseId);
    if(!course)
        return response.status(404).send(error.details[0].message);
        
    
    let enrollment = new Enrollment({
        customer: {
            _id: customer._id,
            name: customer.name
        },
        course: {
            _id: course._id,
            name: course.title
        },
        courseFee: course.fee,
        dateStart: request.body.dateStart
    });

    enrollment = await enrollment.save();
    response.status(201).send(enrollment);

});

router.put('/:id', async (request, response) => {
    let enrollment1 = await Enrollment.findById(request.params.id);
    if(!enrollment1)
        return response.status(404).send('Enrollment topilmadi');
    const {error} = validate(request.body);
    if(error)
        return response.status(400).send(error.details[0].message);

    let course = await Course.findById(request.body.courseId);
    if(!course)
        return response.status(404).send('Course is not found');

    let customer = await Customer.findById(request.body.customerId);
    if(!customer)
        return response.status(404).send('Customer is not found');
    
    let enrollment = await Enrollment.findByIdAndUpdate(request.params.id,{
        customer: {
            _id: customer._id,
            name: customer.name
        },
        course: {
            _id: course._id,
            name: course.title
        },
        courseFee: request.body.courseFee,
        dateStart: request.body.dateStart
     });

     if(!enrollment)
        return response.status(400).send('Berilgan Id ga mos kurs topilmadi');
    
    enrollment = await enrollment.save();
    response.send(enrollment);
    
});

router.delete('/:id', async (request, response) => {
    const enrollment = await Enrollment.findByIdAndRemove(request.params.id);
    if(!enrollment) 
        return response.status(404).send('Enrollment not found');
    response.send(enrollment);
});

module.exports = router;
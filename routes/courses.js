const express = require('express');
const {Course, validate} = require('../models/courses');
const {Category} = require('../models/category');
const { model } = require('mongoose');
const { request, response } = require('express');
const router = express.Router();


router.get('/', async (request, response) => {
    let course = await Course.find().sort('title');
    response.send(course);
});

router.get('/:id', async (request, response) => {
    let course = await Course.findById(request.params.id);
    if(!course) {
        return response.status(404).send('Category not found');
    }

    response.send(course);
});

router.post('/', async (request, response) => {
    const {error} = validate(request.body);
    if(error)
        return response.status(400).send(error.details[0].message);
    
    const category = await Category.findById(request.body.categoryId);

    if(!category)
        return response.status(400).send('Berilgan IDga teng bo\'lgan toifa topilmadi');

    let course = new Course({
        title: request.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        trainer: request.body.trainer,
        tags: request.body.tags,
        status: request.body.status
    });

    course = await course.save();
    response.status(201).send(course);
    
});

router.put('/:id', async (request, response) => {
    const {error} = validate(request.body);
    if(error)
        return response.status(400).send(error.details[0].message);
    
    const category = await Category.findById(request.body.categoryId);

    if(!category) 
        return response.status(400).send('Berilgan IDga teng bo\'lgan category topilmadi');

    let course = await Course.findByIdAndUpdate(request.params.id, {
        title: request.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        trainer: request.body.trainer,
        tags: request.body.tags,
        status: request.body.status
    });

    if(!category) 
        return response.status(400).send('Berilgan IDga teng bo\'lgan course topilmadi');


    response.send(course);
});

router.delete('/:id', async (request, response) => {
    const course = await Course.findByIdAndRemove(request.params.id);
    if(!course) 
        return response.status(404).send('Course not found');
    
    response.send(course);

});



module.exports = router;



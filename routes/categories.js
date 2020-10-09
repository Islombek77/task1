const express = require('express');
const {Category, validate} = require('../models/category')

const router = express.Router();

router.get('/', async (reqeust, response) => {
    let category = await Category.find().sort('name');
    response.send(category);
});

router.get('/:id', async (request, response) => {
    let category = await Category.findById(request.params.id);
    if(!category) {
        return response.status(404).send('Category not found');
    }

    response.send(category);
});

router.post('/', async (request, response) => {
    const {error} = validate(request.body);
    if(error) {
        return response.status(400).send(error.details[0].message);
    }

    let category = new Category({
        name: request.body.name
    });

    category = await category.save();

    
    response.status(201).send(category);
});

router.put('/:id', async (request, response) => {
    let category = await Category.findById(request.params.id)
    if(!category) {
        return response.status(404).send('Course is not found');
    }
    const {error} = validate(request.body);
    if(error) {
        return response.status(400).send(error.details[0].message);
    }

    category.name = request.body.name;
    category = await category.save();
    response.send(category);
    
});

router.delete('/:id', async (request, response) => {

    let category = await Category.findByIdAndRemove(request.params.id);
    if(!category) {
        return response.status(404).send('Category not found');
    }
    
    response.send(category);
});

module.exports = router;
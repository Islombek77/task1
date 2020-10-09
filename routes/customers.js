const express = require('express');
const {Customer, validate} = require('../models/customer');
const router = express.Router();

router.get('/', async (reqeust, response) => {
    let customer = await Customer.find().sort('name');
    response.send(customer);
});

router.get('/:id', async (request, response) => {
    let customer = await Customer.findById(request.params.id);
    if(!customer) {
        return response.status(404).send('Customer not found');
    }

    response.send(customer);
});

router.post('/', async (request, response) => {
    const {error} = validate(request.body);
    if(error) {
        return response.status(400).send(error.details[0].message);
    }

    let customer = new Customer({
        name: request.body.name,
        isVip: request.body.isVip,
        phone: request.body.phone
    });

    customer = await customer.save();

    
    response.status(201).send(customer);
});

router.put('/:id', async (request, response) => {
    let customer = await Customer.findById(request.params.id)
    if(!customer) {
        return response.status(404).send('Course is not found');
    }
    const {error} = validate(request.body);
    if(error) {
        return response.status(400).send(error.details[0].message);
    }

    customer.name = request.body.name;
    customer.isVip = request.body.isVip;
    customer.phone = request.body.phone;
    customer = await customer.save();
    response.send(customer);
    
});

router.delete('/:id', async (request, response) => {

    let customer = await Customer.findByIdAndRemove(request.params.id);
    if(!customer) {
        return response.status(404).send('Customer not found');
    }
    response.send(customer);
});




module.exports = router;
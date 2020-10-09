const express = require('express');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const app = express();
const categoriesRoot = require('./routes/categories');
const customersRoot = require('./routes/customers');
const coursesRoot = require('./routes/courses');
const enrollmentsRoot = require('./routes/enrollments');

mongoose.connect('mongodb://localhost/virtualdars', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB ga ulanish hosil qilindi...');
    })
    .catch((err) => {
        console.error('MongoDbga ulanishda hatolik yuz berdi...');
    });

mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use('/api/categories', categoriesRoot);
app.use('/api/customers', customersRoot);
app.use('/api/courses', coursesRoot);
app.use('/api/enrollments', enrollmentsRoot);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`port ${port} is running` );
})


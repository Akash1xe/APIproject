const express = require('express');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: true
    },
    reating: {
        type: Number,
        default: 4.9,
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now
    },
    company: {
        type: String,
        enum: {  // Enum to restrict the values of company field
            // This will restrict the company field to only these values
            values: ['Apple', 'Samsung', 'Dell', 'Mi', 'Xiaomi', 'Sony'],
            message: '{VALUE} is not supported'
        },
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema) // Exporting the model to use it in other files
// The first argument is the name of the model, which will be used to create the collection
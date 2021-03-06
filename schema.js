const mongoose = require('mongoose');


const definition = 
    new mongoose.Schema({
        link: {
            type: String,
            require: true
        },
        title: {
            type: String,
            require: true
        },
        picture: {
            type: String
        },
        language: {
            type: String,
            require: true
        },
        priority: { //this will determine what to show on portfolio page
            type: Boolean,
            require: false,
            default: false
        },
        site: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: false
        }
    }, {
        timestamps: true
    });

const model = mongoose.model('articles', definition, 'article');
module.exports = model;
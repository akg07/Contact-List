// required mongoose 
const mongoose = require('mongoose');

// create a schema for contact
const contactSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

// define a model for contact
const Contact = mongoose.model('Contact', contactSchema);

// export this model to be used in other js files
module.exports = Contact;
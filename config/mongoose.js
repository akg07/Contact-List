// required the mongoose
const mongoose = require('mongoose');

// connect to the db
mongoose.connect('mongodb://localhost/contact_list_db');

// accquire the connection to check if it successfully
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'error connecting to db'));

// Up and running then print the message
db.once('open', function() {
    console.log('Successfully connected to the DB');
});
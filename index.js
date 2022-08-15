

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/Contact');
const { response } = require('express');

const app = express();

app.use(bodyParser.urlencoded({extended : false})); // it's a middleware

// static file using middleware
app.use(express.static('assets'));

/*
// middleware
app.use(function(req, res, next) {
    console.log("middle ware 1 called");
    next();
});

// middleware 2
app.use(function(req, res, next) {
    console.log("middle ware 2 called");
    next();
});
*/


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var contactList = [
    {
        name : "Aayush",
        phone : "1234567890"
    },
    {
        name : "Tony",
        phone : "5469871302"
    },
    {
        name : "Beta",
        phone : "1235698740"
    }
];

app.get('/', function(req, res){
    // res.send('<h1>Cool Cool Cool Cool, It is running</h1>');

    Contact.find({}, function(err, contacts) {
        if(err) {
            console.log('error at fetching contacts');
            return;
        }
        
        return res.render('home', {
            title : "I am IronMan",
            contact_list : contacts
        });

    })
});

app.get('/experiment', function(req, res){
    return res.render('experiment', {
        title : "Experimental Page"
    });
});

app.post('/create-contact', function(req, res){
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);

    // contactList.push({
    //     name : req.body.name,
    //     phone : req.body.phone
    // });

    Contact.create({
        name : req.body.name,
        phone: req.body.phone
    }, function(err, newContact) {
        if(err) {
            console.log('error in creating contact');
            return;
        }

        console.log('************', newContact);

        return res.redirect('back');
    });


    /*
        contactList.push(req);
        return res.redirect("back");
     */
});

app.get('/delete-contact', function(req, res){
    // console.log(req.params);
    // console.log(req.query.phone);
    // console.log(req.query.name);
    // let phone = req.params.phone;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1) {
    //     contactList.splice(contactIndex, 1);
    // }

    // get the Id from query in the ul
    let id = req.query.id;

    // find the contact in the database using ID and delete this contact
    Contact.findByIdAndDelete(id, function(err){
        if(err) {
            console.log('error at deleting in the database');
            return;
        }

        return res.redirect('back');
    });

});





app.listen(port, function(err){

    if(err) {
        console.log("Error in running the server");
    }

    console.log("My server is running on port : ", port);
});
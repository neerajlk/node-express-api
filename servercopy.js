const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');


var myLogger = function (req, res, next) {
    debugger
    console.log(req, 'LOGGED')
    next()
}

app.use(myLogger)

mongoose.Promise = global.Promise;

// Connecting to the database
// console.log('mongodb+srv://rrajkumar:'+encodeURIComponent("rrajkumar@123")+'@cluster0-jiecn.mongodb.net/mydb?retryWrites=true&w=majority/')
// mongoose.connect('mongodb+srv://rrajkumar:'+encodeURIComponent("rrajkumar@123")+'@cluster0-jiecn.mongodb.net/mydb?retryWrites=true&w=majority/', {dbName: 'mydb'}).then(() => {
//     console.log("Successful");
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now...', err);
//     process.exit();
// });

var connection_string = 'mongodb+srv://cluster0-jiecn.mongodb.net/test';
// conn    = mongoose.createConnection connection_string, { 
mongoose.connect('mongodb+srv://rrajkumar:rrajkumar@cluster0-jiecn.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
}).then(function(res) {
  return console.log("Database connected ... ");
}).catch(function(error) {
  console.error(error);
  return process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to The application" });
});

// Require routes
// require('./routes/person.route.js')(app);




// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

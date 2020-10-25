const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to MongoDB');
});

// use body-parser middleware
app.use(bodyParser.json());

// error handling middleware
app.use(function(err, req, res, next){
  console.log(err); // to see properties of message in our console
  res.status(422).send({error: err.message});
});

// initialize routes
app.use('/api', require('./routes/api'));

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});

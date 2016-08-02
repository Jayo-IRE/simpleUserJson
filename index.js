// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

//var Schema = mongoose.Schema;  

var User     = require('./app/models/user');

// Schemas


//var UserModel= mongoose.model('users', User);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    // do logging
    console.log('Request to server made');
    next(); 
});

// on routes that end in /users
// ----------------------------------------------------
 router.route('/users')

    // get all the Users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
		console.log('in get All function '+req.query);
   //     User.find(function(err, users) {
	//   User.find({'user.gender': 'male'}).
	User.find(req.query).
	   exec(function(err, users) {
            if (err)
                res.send(err);
	//	console.log('number of results= ' + users);
            res.json(users);
        });
    })
	
	.post(function(req, res) {
        
	var userdb = new User({user : {username :req.body.username, gender : req.body.gender }});      // save the user and check for errors
        userdb.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });
        
    });

router.route('/users/:user_id')

    // get the user with that id (accessed at GET http://localhost:8080/api/users:user_id
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
					
		//	console.log('old username ' + user.username );
            res.json(user);
        });
    })

	
	// update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
    .put(function(req, res) {

        // use our user model to find the user we want
        User.findById(req.params.user_id, function(err, userdb) {

            if (err)
                res.send(err);

			console.log('old password ' + userdb.user.password );
			console.log('new password ' + req.body.password )
            userdb.user.password = req.body.password;  // update the users info

            // save the user
            userdb.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });

        });
    })
	
	 .delete(function(req, res) {
        User.findByIdAndRemove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('service running on port ' + port);





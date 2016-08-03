//Jason Finnegan

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var User     = require('./app/models/user');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    console.log('Request to server for:', req.url);  //log all requests
    next(); 
});


// ----------------------------------------------------
 router.route('/users')

    // get all the Users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
	User.find(req.query).
	   exec(function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    })
	
	//POST a new User, user is an json compatible string,   (Content-Type application/json)
	.post(function(req, res) {    
	console.log(req.body);
	var userdb= new User(req.body);
	 userdb.save(function(err) { // save the user and check for errors
            if (err)
                res.send(err);
            res.json({ message: 'User created!' });
        });
	});

router.route('/users/:user_id')

    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })

	
	// update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
	// this expects individual parameters x-www-form-urlencoded  
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, userdb) {
            if (err)
                res.send(err);
				userdb.user.password = req.body.password;     // updates provided fields only
				userdb.user.username=req.body.username;
				userdb.user.location=req.body.location;
				userdb.user.email=req.body.email;
				userdb.user.dob=req.body.dob;
				userdb.user.phone=req.body.phone;

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


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('service running on port ' + port);
console.log('connect to http://localhost:8080/api/users');





var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;



var Picture = new Schema({
	large: String,
    medium: String,
    thumbnail: String
});

var Name = new Schema({
    title: { type: String, required: true },
     first: { type: String, required: true },
     last: { type: String, required: true }
});

var Location = new Schema({
     street : { type: String, required: true },
      city : { type: String, required: true },
      state : { type: String, required: true },
      zip : { type: String, required: true }
});


// User Model

var UserSchema = new Schema({
    gender: { type: String, required: true },
	name : {type: Name, required: false },
	location : {type : Location, required: false },
    email : { type: String, required: false },
    username :{ type: String, required: true },
    password : { type: String, required: false },
    salt : { type: String, required: false },
    md5 : { type: String, required: false },
    sha1 :{ type: String, required: false },
    sha256 : { type: String, required: false },
    registered : { type: Number, required: false },
    dob : { type: Number, required: false },
    phone : { type: String, required: false },
    cell : { type: String, required: false },
    PPS : { type: String, required: false },
    picture :{type :Picture}
});

var UserDBSchema=new Schema({
	user :{type : UserSchema}
})

module.exports = mongoose.model('User', UserDBSchema);

//module.exports = mongoose.model('User', new Schema({user: UserSchema}));
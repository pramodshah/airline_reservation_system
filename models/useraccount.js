var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
// var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username:{
        type:String,
        required:true
    },
    password: String,
    
    name : {
        type: String,
        required: false
    },
    email : { 
        type: String,
        required: false
    }
}, {
    timestamps: true
});

// Account.plugin(passportLocalMongoose);

var User = module.exports = mongoose.model('User', Account);
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newUser.password, salt,function(err,hash){
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username:username};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err,isMatch){
        if(err) throw err;
        callback(null,isMatch);
    });
}

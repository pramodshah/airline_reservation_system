var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

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


Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);

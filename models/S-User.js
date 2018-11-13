const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Create Schema

const S_UserSchema = new Schema ({
    name :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    },
    avatar :{
        type:String
    },
    date :{
        type:String,
        default:Date.now
    }
})


module.exports = S_User = mongoose.model('s-users',S_UserSchema);
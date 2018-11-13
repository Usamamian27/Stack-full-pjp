const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Create Schema

const C_UserSchema = new Schema ({
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


module.exports = C_User = mongoose.model('c-users',C_UserSchema);
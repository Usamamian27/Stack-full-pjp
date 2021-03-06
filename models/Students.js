const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Create Schema

const StudentSchema = new Schema ({
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
    verify:{
        type:Boolean,
        default: false
    },
    date :{
        type:String,
        default:Date.now
    }
});


module.exports = Students = mongoose.model('students',StudentSchema);

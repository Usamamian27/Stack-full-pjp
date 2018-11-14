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
    cnic:{
        type: String,
        required: true
    },
    DOB:{
        type: Date,
        default: Date.now
    },
    roll: {
        type: String,
        required:true
    },
    phone: {
        type: String,
        required:true
    },

    address: {
        type: String,
        required:true
    },

    date :{
        type:String,
        default:Date.now
    }
})


module.exports = Students = mongoose.model('students',StudentSchema);
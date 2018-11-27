const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema

const CVSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'students'
    },
    handle:{
        type: String,
        required:true,
        max:40
    },
    company :{
        type:String
    },
    website:{
        type:String
    },
    location:{
        type:String
    },
    status:{
        type:String,
        required: true
    },
    skills:{
        type: [String],
        required:true
    },
    bio:{
        type:String
    },
    githubusername:{
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
    social:{
        youtube :{
            type:String
        },
        twitter :{
            type:String
        },
        facebook :{
            type:String
        },
        linkedin :{
            type:String
        },
        instagram :{
            type:String
        },
        date:{
            type:Date,
            default:Date.now
        }

    },
    experience :[
        {
            title: {
                type : String,
                 required: true
            },
            company: {
                type:String,
                required:true
            },
            location:{
                type:String
            },
            from :{
                type:Date,
                required: true
            },
            to:{
                type:Date
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String
            }

        }
    ],
    education :[
        {
            school: {
                type : String,
                required: true
            },
            degree: {
                type:String,
                required:true
            },
            fieldofstudy:{
                type:String,
                required:true
            },
            from :{
                type:Date,
                required: true
            },
            to:{
                type:Date
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String
            }

        }
    ],
    projects:
    [
        {
            title: {
                type : String,
                 required: true
            },
            from :{
                type:Date,
                required: true
            },
            to:{
                type:Date
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String
            }
        }
    ]


});


module.exports = CV = mongoose.model('cvs',CVSchema);






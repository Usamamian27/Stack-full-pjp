const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const PostSchema = new Schema({
   user:{
       type: Schema.Types.ObjectId,
       ref:'companies'
   },
    text:{
       type: String,
        required:true
    },
    name:{
       type:String
    },
    avatar:{
       type:String
    },
    applied:[
        {
            user:{
                type:Schema.ObjectId,
                ref:'students'
            }
        }
    ],
    comments:[
        {
            user:{
                type:Schema.ObjectId,
                ref:'companies'
            },
            user1:{
                type:Schema.ObjectId,
                ref:'students'
            },
            text:{
                type:String,
                required: true
            },
            name:{
                type:String
            },
            avatar:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports= Posts = mongoose.model('posts',PostSchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Create Schema

const PortfolioSchema = new Schema ({
    user:{
        type: Schema.Types.ObjectId,
        ref:'companies'
    },
    handle:{
        type: String,
        required:true,
        max:40
    },
    phone: {
        type:String,
        required:true
    },
    website: {
        type:String,
        required:true
    },
    address: {
            city: {
                type:String,
                //required:true
            },
            country: {
                type:String,
                //required:true
            },
    },
    description:{
        type:String,
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
});

module.exports = Portfolio = mongoose.model('portfolios',PortfolioSchema);

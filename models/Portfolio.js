const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Create Schema

const PortfolioSchema = new Schema ({
    user:{
        type: Schema.Types.ObjectId,
        ref:'companies'
    },
    name: {
        type:String,
        required:true
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
    desc:{
        type:String,
        required:true
    }
});

module.exports = Portfolio = mongoose.model('portfolios',PortfolioSchema);

const Validator = require('validator');
const isEmpty =  require('./isEmpty');


module.exports = function validatePortfolioInput(data){

    let portfolioerrors= {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.website = !isEmpty(data.website) ? data.website : '';
    data.description = !isEmpty(data.description) ? data.description : '';


    if(!Validator.isLength(data.handle,{min:2 , max: 40})){
        portfolioerrors.handle = 'handle needs to be b/w 2 and 40 characters';
    }

    if (Validator.isEmpty(data.handle)){
        portfolioerrors.handle= 'portfolio handle is required';
    }
    if (!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            portfolioerrors.website = 'Not a valid URL';
        }
    }
    if (Validator.isEmpty(data.phone)){
        portfolioerrors.phone= 'Phone is required';
    }
    if (Validator.isEmpty(data.description)){
        portfolioerrors.description= 'Description is required';
    }

    return{
        portfolioerrors : portfolioerrors,
        isValid : isEmpty(portfolioerrors)
    }

};

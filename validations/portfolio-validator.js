const Validator = require('validator');
const isEmpty =  require('./isEmpty');


module.exports = function validatePortfolioInput(data){

    let errors= {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.website = !isEmpty(data.website) ? data.website : '';
    data.description = !isEmpty(data.description) ? data.description : '';


    if(!Validator.isLength(data.handle,{min:2 , max: 40})){
        errors.handle = 'handle needs to be b/w 2 and 40 characters';
    }

    if (Validator.isEmpty(data.handle)){
        errors.handle= 'portfolio handle is required';
    }
    if (!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = 'Not a valid URL';
        }
    }
    if (Validator.isEmpty(data.phone)){
        errors.phone= 'Phone is required';
    }
    if (Validator.isEmpty(data.description)){
        errors.description= 'Description is required';
    }

    return{
        errors : errors,
        isValid : isEmpty(errors)
    }

};

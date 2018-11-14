const Validator = require('validator');
const isEmpty =  require('./isEmpty');


module.exports = function validatePortfolioInput(data){

    let errors= {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.website = !isEmpty(data.website) ? data.website : '';
    data.desc = !isEmpty(data.desc) ? data.desc : '';


    if (!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = 'Not a valid URL';
        }
    }
    if (Validator.isEmpty(data.name)){
        errors.name= 'Company name is required';
    }
    if (Validator.isEmpty(data.phone)){
        errors.phone= 'Phone is required';
    }
    if (Validator.isEmpty(data.desc)){
        errors.desc= 'Description is required';
    }

    return{
        errors : errors,
        isValid : isEmpty(errors)
    }

};

const Validator = require('validator');
const isEmpty =  require('./isEmpty');

module.exports = function validateProjectInput(data){

    let errors= {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.from = !isEmpty(data.from) ? data.from : '';


    if(Validator.isEmpty(data.title)){
        errors.title = 'Title Field is Required';
    }
    
    if(Validator.isEmpty(data.from)) {
        errors.from = 'From Date Field is Required';
    }

    return{
        errors : errors,
        isValid : isEmpty(errors)
    }

};
const Validator = require('validator');
const isEmpty =  require('./isEmpty');

module.exports = function validateLoginInput(data){

    let errors= {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isEmail(data.email)){
        errors.email = 'Email  is Invalid';
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email Field is Required';
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'Password Field is Required';
    }

    if(data.verify === false){
        errors.verify = 'Not approved by admin yet!';
    }

    return{
        errors : errors,
        isValid : isEmpty(errors)
    }

};

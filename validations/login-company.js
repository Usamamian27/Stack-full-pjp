const Validator = require('validator');
const isEmpty =  require('./isEmpty');

module.exports = function validateLoginInputCompany(data){

    let errorsCompany= {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isEmail(data.email)){
        errorsCompany.email = 'Email  is Invalid';
    }

    if(Validator.isEmpty(data.email)){
        errorsCompany.email = 'Email Field is Required';
    }

    if(Validator.isEmpty(data.password)){
        errorsCompany.password = 'Password Field is Required';
    }


    return{
        errorsCompany : errorsCompany,
        isValid : isEmpty(errorsCompany)
    }

};

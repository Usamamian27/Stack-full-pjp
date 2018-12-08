const Validator = require('validator');
const isEmpty =  require('./isEmpty');

module.exports = function validateRegisterInputCompany(data){

    let errorsCompany= {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(!Validator.isLength(data.name,{min :2 , max :30})){
        errorsCompany.name= 'Name must be valid i.e b/w 2 - 30 characters';
    }

    if(Validator.isEmpty(data.name)){
        errorsCompany.name = 'Name Field is Required';
    }

    if(Validator.isEmpty(data.email)){
        errorsCompany.email = 'Email Field is Required';
    }

    if(!Validator.isEmail(data.email)){
        errorsCompany.email = 'Email  is Invalid';
    }

    if(Validator.isEmpty(data.password2)){
        errorsCompany.password2 = 'Confirm Password Field is Required';
    }

    if(!Validator.equals(data.password , data.password2)){
        errorsCompany.password2 = 'Passwords must match';
    }
    if(!Validator.isLength(data.password,{min :6 , max :30})){
        errorsCompany.password= 'Password must be valid atleast 6 characters';
    }

    if(Validator.isEmpty(data.password)){
        errorsCompany.password = 'Password Field is Required';
    }

    return{
        errorsCompany : errorsCompany,
        isValid : isEmpty(errorsCompany)
    }

};

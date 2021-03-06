const Validator = require('validator');
const isEmpty =  require('./isEmpty');

module.exports = function validateRegisterInput(data){

    let errors= {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    // data.cnic = !isEmpty(data.cnic) ? data.cnic : '';
    // data.address = !isEmpty(data.address) ? data.address : '';
    // data.roll = !isEmpty(data.roll) ? data.roll : '';
    // data.phone = !isEmpty(data.phone) ? data.phone : '';




    if(!Validator.isLength(data.name,{min :2 , max :30})){
        errors.name= 'Name must be valid i.e b/w 2 - 30 characters';
    }
    // if(!Validator.isLength(data.cnic,{min :13 , max :15})){
    //     errors.cnic= 'CNIC must be valid i.e b/w 13 characters without dashes';
    // }

    if(Validator.isEmpty(data.name)){
        errors.name = 'Name Field is Required';
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email Field is Required';
    }

    if(!Validator.isEmail(data.email)){
        errors.email = 'Email  is Invalid';
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = 'Confirm Password Field is Required';
    }

    if(!Validator.equals(data.password , data.password2)){
        errors.password2 = 'Passwords must match';
    }
    if(!Validator.isLength(data.password,{min :6 , max :30})){
        errors.password= 'Password must be valid atleast 6 characters';
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'Password Field is Required';
    }
    // if(Validator.isEmpty(data.phone)){
    //     errors.phone = 'Phone Field is Required';
    // }
    // if(Validator.isEmpty(data.address)){
    //     errors.address = 'Address Field is Required';
    // }
    // if(Validator.isEmpty(data.cnic)){
    //     errors.cnic = 'cnic Field is Required';
    // }
    // if(Validator.isEmpty(data.roll)){
    //     errors.roll = 'Roll Field is Required';
    // }



    return{
        errors : errors,
        isValid : isEmpty(errors)
    }

};

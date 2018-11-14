const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../Config/keys');
const passport = require('passport');

// Load Company model
const Company = require('../../../models/Company');

// Load Input validations
const validateRegisterInput = require ('../../../validations/register');
const validateLoginInput = require('../../../validations/login');

// route Get api/users/test
router.get('/test',(req,res)=>{

    res.json({msg: "Company User Works"});
});

// Route Post api/Company/c-user
// desc register company
//access public
router.post('/register',(req,res)=>{

    const {errors , isValid} = validateRegisterInput(req.body);
    //Check  Validations
    if(!isValid){
        return res.status(400).json(errors);
    }

    Company.findOne({ email : req.body.email })
        .then(company => {
            if(company){
                return res.status(400).json({email:'Email Already Exists'});
            }
            else {

                // getting the email & passing it to gravatar to get image
                const avatar = gravatar.url(req.body.email,{
                    s:'200', //Size
                    r:'pg',  // Rating
                    d:'mm'   // Default
                });

                const newCompany = new Company({
                    name : req.body.name,
                    email:req.body.email,
                    avatar:avatar,
                    password:req.body.password
                });

                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newCompany.password,salt,(err,hash)=>{

                        if(err) throw  err;
                        newCompany.password =hash;
                        newCompany.save()
                            .then(company => res.json(company))
                            .catch(err => console.log(err));
                    })
                })
            }
        })

});

// Route Get api/users/login
// DESC Login User /returning JWT Token
// Public

router.post('/login',(req,res)=>{
    
    const {errors , isValid} = validateLoginInput(req.body);
    // Check  Validations
    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find company by Email
    Company.findOne({email: email })
        .then(company => {
            // Check for company
            if (!company){
                return res.status(404).json({email:'company Not Found'});
            }
            // Check  password
            bcrypt.compare(password,company.password)
                .then(isMatch=> {
                    if (isMatch) {
                        //company matched
                        // Creating Jwt payload
                        const payload_c ={
                            id:company.id,
                            name:company.name,
                            avatar:company.avatar
                        };
                        // sign token
                        jwt.sign(
                            payload_c,
                            keys.secretOrKey,
                            {expiresIn: 8.64e+7},
                            (err,token)=>{
                                res.json({
                                success : true,
                                token:'Bearer ' + token
                            });
                        });
                    }
                    else {
                        return res.status(400).json({password: 'Password incorrect'});
                    }
                })
        })
});

// Route Get api/companys/current
// desc return current company
// access private
router.get('/current',passport.authenticate('Company', { session : false}),(req,res)=>{
    
    // sending only specific fields of our choice
    res.json({
        id:req.user.id,
        name:req.user.name,
        email: req.user.email
    });
}
);

module.exports = router;
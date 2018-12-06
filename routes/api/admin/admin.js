const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../Config/keys');
const passport = require('passport');

// Load Company model
const Admin = require('../../../models/Admin');

// Load Input validations
const validateAdminLoginInput = require('../../../validations/admin-login');

// route Get api/admin/admin/test
router.get('/test',(req,res)=>{

    res.json({msg: "Admin Works"});
});

// Route Post api/Company/c-user
// desc register Admin
//access public
router.post('/register',(req,res)=>{
    Admin.findOne({ email : req.body.email })
        .then(admin => {
            if(admin){
                return res.status(400).json({email:'Email Already Exists'});
            }
            else {

                // getting the email & passing it to gravatar to get image
                const avatar = gravatar.url(req.body.email,{
                    s:'200', //Size
                    r:'pg',  // Rating
                    d:'mm'   // Default
                });

                const newAdmin = new Admin({
                    name : req.body.name,
                    email:req.body.email,
                    avatar:avatar,
                    password:req.body.password
                });

                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newAdmin.password,salt,(err,hash)=>{

                        if(err) throw  err;
                        newAdmin.password =hash;
                        newAdmin.save()
                            .then(admin => res.json(admin))
                            .catch(err => console.log(err));
                    })
                })
            }
        })

});

// Route Get api/users/login
// DESC Login Admin /returning JWT Token
// Public

router.post('/login',(req,res)=>{

    const {errors , isValid} = validateAdminLoginInput(req.body);
    // Check  Validations
    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find Admin by Email
    Admin.findOne({email: email })
        .then(admin => {
            // Check for company
            if (!admin){
                return res.status(404).json({email:'admin Not Found'});
            }
            // Check  password
            bcrypt.compare(password,admin.password)
                .then(isMatch=> {
                    if (isMatch) {
                        //company matched
                        // Creating Jwt payload
                        const payload_c ={
                            id:admin.id,
                            name:admin.name,
                            avatar:admin.avatar
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

// Route Get api/admin//admin/current
// desc return current company
// access private
router.get('/current',passport.authenticate('Admin', { session : false}),(req,res)=>{

        // sending only specific fields of our choice
        res.json({
            id:req.user.id,
            name:req.user.name,
            email: req.user.email
        });
    }
);

module.exports = router;

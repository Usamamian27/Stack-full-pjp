const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../Config/keys');
const passport = require('passport');

// Load Student model
const Student = require('../../../models/Students');

// Load Input validations
const validateRegisterInput = require ('../../../validations/register');
const validateLoginInput = require('../../../validations/login');

// route Get api/users/test
router.get('/test',(req,res)=>{

    res.json({msg: "Users Works"});
});

// Route Post api/student/student
// desc register student
//access public
router.post('/register',(req,res)=>{

    const {errors , isValid} = validateRegisterInput(req.body);
    //Check  Validations
    if(!isValid){
        return res.status(400).json(errors);
    }

    Student.findOne({ email : req.body.email })
        .then(user => {
            if(user){
                return res.status(400).json({email:'Email Already Exists'});
            }
            else {

                // getting the email & passing it to gravatar to get image
                const avatar = gravatar.url(req.body.email,{
                    s:'200', //Size
                    r:'pg',  // Rating
                    d:'mm'   // Default
                });



                const newStudent = new Student({
                    name : req.body.name,
                    email:req.body.email,
                    avatar:avatar,
                    password:req.body.password,

                });

                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newStudent.password,salt,(err,hash)=>{

                        if(err) throw  err;
                        newStudent.password =hash;
                        newStudent.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })

});

// Route Get api/users/login
//DESC Login User /returning JWT Token
// Public

router.post('/login',(req,res)=>{

    const {errors , isValid} = validateLoginInput(req.body);

    // Check  Validations

    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by Email
    Student.findOne({email: email })
        .then(user => {
            // Check for user
            if (!user){
                return res.status(404).json({email:'User Not Found'});
            }
            // Check  password
            bcrypt.compare(password,user.password)
                .then(isMatch=> {
                    if (isMatch) {
                        // User matched
                        // Creating Jwt payload
                        const payload ={
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            email:user.email
                        };
                        // sign token
                        jwt.sign(
                            payload,
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

// Route Get api/users/current
// desc return current user
//access private
router.get('/current',passport.authenticate('Student', { session : false}),(req,res)=>{

    // sending only specific fields of our choice
    res.json({
        id:req.user.id,
        name:req.user.name,
        email: req.user.email
    });
}
);
module.exports = router;

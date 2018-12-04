const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Company Portfolio Model
const Portfolio = require('../../../models/Portfolio');
// Load Company User Model
const Company = require('../../../models/Company');

//Load Validations
const validatePortfolioInput = require('../../../validations/portfolio-validator');


// route Get api/company/Portfolio
// desc Get Current Company's profile
// access private
router.get('/',passport.authenticate('Company',{session :false}),(req,res)=>{

    const errors ={};

    Portfolio.findOne({user : req.user.id})
    // attaching name and avatar with our response
        .populate('user',['name','avatar'])
        .then(profile =>{
           if(!profile){
               errors.noprofile = 'No Portfolio Found for this Company!';
               res.status(404).json(errors);
           }
           else {
               res.json(profile);
           }
       })
        .catch(err=> res.status(404).json(err));
});

// route Get api/company/portfolio/all
// desc Get all portfolios
// access public

router.get('/all',(req,res)=>{
    const errors ={};
    //console.log('ALL Portfolios');

    Portfolio.find()
        .populate('user',['name','avatar'])
        .then(profiles => {
            if(!profiles){
                errors.noportfolio = 'There are no Portfolios';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => res.status(404).json({portfolio:'No Portfolio Found'}));
});

// route Post api/company/portfolio
// desc Create or Edit  Company Profile
// access private

router.post('/',passport.authenticate(
    'Company',
    {session :false}),
    (req,res)=>{

        // Check  Validations
        const {portfolioerrors , isValid } = validatePortfolioInput(req.body);
        // Return any errors with 400 status
        if(!isValid){
            return res.status(400).json(errors);
        }

        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;
        // if (req.body.name) profileFields.name = req.body.name;
        // if (req.body.email) profileFields.email = req.body.email;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.phone) profileFields.phone = req.body.phone;
        if (req.body.description) profileFields.description = req.body.description;

        // Address
        profileFields.address={};
        if (req.body.city) profileFields.address.city = req.body.city;
        if (req.body.country) profileFields.address.country = req.body.country;

        // Social
        profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;


        Portfolio.findOne({user : req.user.id})

            .then(profile =>{
                // if profile found it means we are updating a profile

                if(profile){
                    // Update

                    Portfolio.findOneAndUpdate(
                        {user :req.user.id},
                        {$set: profileFields},
                        {new :true}
                        )
                        .then(profile=> res.json(profile));

                }
                else {
                    // Create

                    // Check if email exist
                    Portfolio.findOne({handle : profileFields.handle})
                        .then(profile =>{
                            if (profile){
                                portfolioerrors.handle ='The handle Already Exist';
                                res.status(400).json(portfolioerrors);
                            }

                            // Save profile

                            new Portfolio(profileFields).save()
                                .then(profile => res.json(profile))
                                .catch(err=> res.status(404).json(err));

                        })
                }
            })
    });

// route Get api/company/portfolio/user/:user_id
// desc Get portfolio by User ID
// access public

router.get('/user/:user_id',(req,res)=>{

    const errors ={};

    Portfolio.findOne({user:req.params.user_id})
        .populate('user',['name','avatar'])
        .then(profile =>{
            if(!profile){
                errors.noprofile = 'No portfolio found for this company';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json({profile:'No Portfolio Found'}));
});

// route Get api/student/cv/handle/:handle
// desc Get profile by handle
// access public

router.get('/handle/:handle',(req,res)=>{

    const errors ={};

    Portfolio.findOne({handle:req.params.handle})
        .populate('user',['name','avatar'])
        .then(profile =>{
            if(!profile){
                errors.noprofile = 'No Portfolio found for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// route Delete api/student/cv
// desc  Delete user and cv
// access private
router.delete ('/',passport.authenticate('Company',{session : false}),
    (req,res)=>{

    Portfolio.findOneAndRemove({user : req.user.id}).then(()=>{
        Company.findOneAndRemove({_id: req.user.id}).then(()=>{
                res.json({success: true});
            })
        })
 });















module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');



// Load Student Profile Model
const S_Profile = require('../../../models/S-Profile');
// Load Student User Model
const S_User = require('../../../models/S-User');

//Load Validations
const validateProfileInput = require('../../../validations/profile-validatior');


// route Get api/student/s-profile
// desc Get Current Student's profile
// access private

router.get('/',passport.authenticate('Student',{session :false}),(req,res)=>{

    const errors ={};

    S_Profile.findOne({user : req.user.id})
    // attaching name and avatar with our response
        .populate('user',['name','avatar'])
        .then(profile =>{
           if(!profile){
               errors.noprofile = 'No Profile Found for this User!';
               res.status(404).json(errors);

           }
           else {
               res.json(profile);
           }
       })
        .catch(err=> res.status(404).json(err));
});


// route Post api/profile
// desc Create or Edit  User Profile
// access private

router.post('/',passport.authenticate(
    'Student',
    {session :false}),
    (req,res)=>{

        // Check  Validations
        const {errors , isValid } = validateProfileInput(req.body);
        // Return any errors with 400 status
        if(!isValid){
            return res.status(400).json(errors);
        }

        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.status) profileFields.status = req.body.status;
        if (req.body.githubusername)
            profileFields.githubusername = req.body.githubusername;
        // Skills - Spilt into array
        if (typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',');
        }

        // Social
        profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;


        S_Profile.findOne({user : req.user.id})

            .then(profile =>{
                // if profile found it means we are updating a profile

                if(profile){
                    // Update

                    S_Profile.findOneAndUpdate(
                        {user :req.user.id},
                        {$set: profileFields},
                        {new :true}
                        )
                        .then(profile=> res.json(profile));

                }
                else {
                    // Create

                    // Check if handle exist
                    S_Profile.findOne({handle : profileFields.handle})
                        .then(profile =>{
                            if (profile){
                                errors.handle ='The handle Already Exist';
                                res.status(400).json(errors);
                            }

                            // Save profile

                            new S_Profile(profileFields).save()
                                .then(profile => res.json(profile));

                        })

                }

            })

    });




module.exports = router;
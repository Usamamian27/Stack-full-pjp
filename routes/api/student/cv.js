const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');



// Load Student Profile Model
const CV = require('../../../models/CV');
// Load Student User Model
const Student = require('../../../models/Students');

//Load Validations
const validateProfileInput = require('../../../validations/profile-validatior');
//Load Validations
const validateExperienceInput = require('../../../validations/experience');
//Load Validations
const validateEducationInput = require('../../../validations/education');
//Load Validations
const validateProjectInput = require('../../../validations/project');



// route Get api/student/cv
// desc Get Current Student's CV
// access private

router.get('/',passport.authenticate('Student',{session :false}),(req,res)=>{

    const errors ={};

    CV.findOne({user : req.user.id})
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


        CV.findOne({user : req.user.id})

            .then(profile =>{
                // if profile found it means we are updating a profile

                if(profile){
                    // Update

                    CV.findOneAndUpdate(
                        {user :req.user.id},
                        {$set: profileFields},
                        {new :true}
                        )
                        .then(profile=> res.json(profile));

                }
                else {
                    // Create

                    // Check if handle exist
                    CV.findOne({handle : profileFields.handle})
                        .then(profile =>{
                            if (profile){
                                errors.handle ='The handle Already Exist';
                                res.status(400).json(errors);
                            }

                            // Save profile

                            new CV(profileFields).save()
                                .then(profile => res.json(profile))
                                .catch(err=> res.status(404).json(err));

                        })

                }

            })

    });


// route Get api/student/cv/all
// desc Get all cvs
// access public

router.get('/all',(req,res)=>{
    const errors ={};
    //console.log('ALL PROFILES');

    CV.find()
        .populate('user',['name','avatar'])
        .then(profiles => {
            if(!profiles){
                errors.noprofile = 'There are no CVs';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => res.status(404).json({profile:'No CV Found'}));
});


// route Get api/student/cv/handle/:handle
// desc Get profile by handle
// access public

router.get('/handle/:handle',(req,res)=>{

    const errors ={};

    CV.findOne({handle:req.params.handle})
        .populate('user',['name','avatar'])
        .then(profile =>{
            if(!profile){
                errors.noprofile = 'No CV found for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// route Get api/student/cv/user/:user_id
// desc Get profile by User ID
// access public

router.get('/user/:user_id',(req,res)=>{

    const errors ={};

    CV.findOne({user:req.params.user_id})
        .populate('user',['name','avatar'])
        .then(profile =>{
            if(!profile){
                errors.noprofile = 'No profile found for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json({profile:'No Profile Found'}));
});


router.post ('/experience',passport.authenticate('Student',{session : false}),(req,res)=>{

    // Check  Validations
    const {errors , isValid } = validateExperienceInput(req.body);
    // Return any errors with 400 status
    if(!isValid){
        return res.status(400).json(errors);
    }

    CV.findOne({user : req.user.id})
        .then(profile =>{
            const newExp ={
                title:req.body.title,
                company:req.body.company,
                location:req.body.location,
                from:req.body.from,
                to:req.body.to,
                current:req.body.current,
                description:req.body.description
            }

            // Add to Exp array in profile

            profile.experience.unshift(newExp);
            profile.save()
                .then(profile => res.json(profile));
        })
});

// route Post api/student/cv/education
// desc  Add education to the CV
// access private


router.post ('/education',passport.authenticate('Student',{session : false}),
    (req,res)=>{


    // Check  Validations
    const {errors , isValid } = validateEducationInput(req.body);
    // Return any errors with 400 status
    if(!isValid){
        return res.status(400).json(errors);
    }

    CV.findOne({user : req.user.id})
        .then(profile =>{
            const newEdu ={
                school:req.body.school,
                degree:req.body.degree,
                fieldofstudy:req.body.fieldofstudy,
                from:req.body.from,
                to:req.body.to,
                current:req.body.current,
                description:req.body.description

            };

            // Add to Exp array in profile

            profile.education.unshift(newEdu);
            profile.save()
                .then(profile => res.json(profile));
        })
});

// route Post api/student/cv/education
// desc  Add education to the CV
// access private


router.post ('/project',passport.authenticate('Student',{session : false}),
    (req,res)=>{


    // Check  Validations
    const {errors , isValid } = validateProjectInput(req.body);
    // Return any errors with 400 status
    if(!isValid){
        return res.status(400).json(errors);
    }

    CV.findOne({user : req.user.id})
        .then(profile =>{
            const newEdu ={
                title:req.body.title,
                from:req.body.from,
                to:req.body.to,
                current:req.body.current,
                description:req.body.description

            };

            // Add to Exp array in profile

            profile.projects.unshift(newEdu);
            profile.save()
                .then(profile => res.json(profile));
        })
});


// route Delete api/student/cv/experience/:exp_id
// desc  Delete Experience from the CV
// access private


router.delete ('/experience/:exp_id',passport.authenticate('Student',{session : false}),
    (req,res)=>{


        CV.findOne({user : req.user.id})
            .then(profile =>{

                // Get Remove index of Experiences
                const removeIndex = profile.experience
                    .map(item => item.id)
                    .indexOf(req.params.exp_id);


                // Splice out of array
                profile.experience.splice(removeIndex,1);
                //save
                profile.save().then(profile => res.json(profile));
            }).catch(err => res.status(404).json(err));
    });

// route Delete api/student/cv/education/:edu_id
// desc  Delete Education from the CV
// access private


router.delete ('/education/:edu_id',passport.authenticate('Student',{session : false}),
    (req,res)=>{

        CV.findOne({user : req.user.id})
            .then(profile =>{
                
                // Get Remove index of Experiences
                const removeIndex = profile.education
                    .map(item => item.id)
                    .indexOf(req.params.edu_id);

                // Splice out of array
                profile.education.splice(removeIndex,1);

                //save
                profile.save().then(profile => res.json(profile));
            }).catch(err => res.status(404).json(err));
    });

// route Delete api/student/cv/education/:edu_id
// desc  Delete Education from the CV
// access private


router.delete ('/project/:project_id',passport.authenticate('Student',{session : false}),
    (req,res)=>{

        CV.findOne({user : req.user.id})
            .then(profile =>{
                
                // Get Remove index of Experiences
                const removeIndex = profile.projects
                    .map(item => item.id)
                    .indexOf(req.params.edu_id);

                // Splice out of array
                profile.projects.splice(removeIndex,1);

                //save
                profile.save().then(profile => res.json(profile));
            }).catch(err => res.status(404).json(err));
    });

// route Delete api/student/cv
// desc  Delete user and cv
// access private


router.delete ('/',passport.authenticate('Student',{session : false}),
    (req,res)=>{

    CV.findOneAndRemove({user : req.user.id}).then(()=>{
        Student.findOneAndRemove({_id: req.user.id}).then(()=>{
                res.json({success: true});
            })
        })
 });














module.exports = router;
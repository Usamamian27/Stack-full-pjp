// authentication info


const express = require('express');
const router = express.Router();
const mongoose =require('mongoose');
const passposrt = require('passport');
const nodemailer = require('nodemailer');
// Post Model
const Post = require('../../../models/Post');
//Company Model
const Company = require('../../../models/Company');
//Student Model
const Student = require('../../../models/Students');
// CV Model
const CV = require('../../../models/CV');


// Validation for Post
const validatePostInput = require('../../../validations/post-validations');

// route Get api/company/posts/test
// desc Tests post route
//access public
router.get('/test',(req,res)=>{

    res.json({msg: "Posts Works"});
});

// route Get api/posts
// desc Get posts
//access public

router.get('/',(req,res)=>{
    Post.find()
        .sort({date: -1})
        .then(post => res.json(post))
        .catch(err => res.status(404).json({msg:'No posts found'}));
});

// route Post api/company/posts
// desc Create post
//access private
router.post('/',passposrt.authenticate('Company',{session:false}),(req,res)=>{

    const { errors , isValid} = validatePostInput(req.body);

    //Check validation
    if(!isValid){
        // If any errors , send 400 with error object
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text:req.body.text,
        name:req.body.name,
        avatar:req.body.avatar,
        email:req.user.email,
        title:req.body.title,
        experience:req.body.experience,
        skills:req.body.skills,
        type:req.body.type,
        user:req.user.id
    });

    newPost.save().then(post => res.json(post));
});

// route Get api/company/posts
// desc Get Single post by id
//access public

router.get('/:id',(req,res)=>{
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({msg : 'No post found for this id'}));
});

router.delete('/:id',passposrt.authenticate('Company',{session:false}),(req,res)=> {

    Company.findOne({user : req.user.id})
        .then(profile =>{

            Post.findById(req.params.id)
                .then(post =>{
                    // Check for Post Owner
                    if(post.user.toString() !== req.user.id){
                        return res.status(401).json({nonAuthorized :'User is Not Authorized'});
                    }
                    // Delete Post
                    post.remove()
                        .then(()=>{
                            res.json({success : true})
                        })
                        .catch(err => res.status(404).json({postNotFound:'No Post Found'}));
                });
        });
});

// route Post api/posts/apply/:id
// desc Apply to post
//access private

router.post('/apply/:id',passposrt.authenticate('Student',{session:false}),
    (req,res)=>
{
    Student.findOne({user: req.user.id})
        .then(profile => {

            Post.findById(req.params.id)
                .then(post => {

                    const newApplicant = {
                        name: req.user.name,
                        avatar: req.user.avatar,
                        email:req.user.email,
                        user:req.user.id
                    };
                    if(post.applied.filter(apply => apply.user.toString() === req.user.id).length > 0){
                        return res.status((400).json({alreadyApplied:'User already applied to this post'}))
                    }
                    // Add user id to apply array to apply to the post
                    post.applied.unshift(newApplicant);
                    // save to mongoDB
                    post.save().then(post => res.json(post) );

                })
                .catch(err => res.status(404).json({postNotfound:'No Post Found'}));

        });

});

// route Post api/company/posts/comment/:id
// desc Add comment to  post
//access private

router.post('/comment/:id',passposrt.authenticate(['Company','Student'],{session:false}),
    (req,res)=>{

        const { errors , isValid} = validatePostInput(req.body);

        //Check validation
        if(!isValid){
            // If any errors , send 400 with error object
            return res.status(400).json(errors);
        }
        Post.findById(req.params.id)
            .then(post => {
                const newComment = {
                    text: req.body.text,
                    name: req.user.name,
                    avatar: req.user.avatar,
                    //user: req.comments.user1.id
                    user:req.user.id
                };

                // Add comment to comments array
                post.comments.unshift(newComment);
                //save
                post.save().then(post => res.json(post));
            })
        .catch(err => res.status(404).json({nopostfound: 'No Post Found'}));



        // Student.findOne({user: req.user.id})
        //     .then(profile => {
        //
        //         Post.findById(req.params.id)
        //             .then(post => {
        //                 const newComment = {
        //                     text: req.body.text,
        //                     name: req.user.name,
        //                     avatar: req.user.avatar,
        //                     user: req.user.id
        //                 };
        //
        //
        //                 // Add comment to comments array
        //                 post.comments.unshift(newComment);
        //                 //save
        //                 console.log(newComment);
        //                 post.save().then(post => res.json(post));
        //             })
        //             //.catch(err => res.status(404).json({nopostfound: 'No Post Found'}));
        //
        //
        // Company.findOne({user: req.user.id})
        //     .then(profile => {
        //
        //         Post.findById(req.params.id)
        //             .then(post => {
        //                 const newComment = {
        //                     text: req.body.text,
        //                     name: req.body.name,
        //                     avatar: req.body.avatar,
        //                     user: req.user.id
        //
        //
        //                 };
        //
        //                 // Add comment to comments array
        //                 post.comments.unshift(newComment);
        //                 //save
        //                 post.save().then(post => res.json(post));
        //             })
        //             .catch(err => res.status(404).json({nopostfound: 'No Post Found'}));
        //     })
        //     .catch(err => res.status(404).json({nopostfound: 'No Post Found'}));
        //
        //     });


});


// route Delete api/company/posts/comment/:id/:comment_id
// desc remove comment to  post
//access private

router.delete('/comment/:id/:comment_id',passposrt.authenticate(['Company','Student'],{session:false}),
    (req,res)=>{

        Post.findById(req.params.id)
            .then(post =>{

                // Check to see if the comment exist
                if(
                    post.comments.filter(
                    comment => comment._id.toString() === req.params.comment_id
                    ).length === 0
                ) {
                    return res.status(404).json({commentnotexist:'Comment not Exist'});
                }

                //get an index to remove
                    const removeIndex = post.comments
                        .map(item => item._id.toString())
                        .indexOf(req.params.comment_id);

                    // Splice out of array
                    post.comments.splice(removeIndex,1);
                    //save
                    post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({nopostfound:'No Post Found'}));
    });


// route Post api/posts/shortlist/:id
// desc Shortlist students
//access private

router.post('/shortlist/:id/:postID',passposrt.authenticate('Company',{session:false}),
    (req,res)=> {

        Student.findOne({user: req.params.id})
            .then(profile => {

                Post.findById(req.params.postID)
                    .then(post => {

                        const newApplicant = {
                            name: req.user.name,
                            avatar: req.user.avatar,
                            email:req.user.email,
                            user:req.params.id
                        };
                        if(post.shortlist.filter(apply => apply.user.toString() === req.params.id).length > 0){
                            return res.status((400).json({alreadyApplied:'User already applied to this post'}))
                        }
                        // Add user id to apply array to apply to the post
                        post.shortlist.unshift(newApplicant);
                        // save to mongoDB
                        post.save().then(post => res.json(post) );

                    })
                    .catch(err => res.status(404).json({postNotfound:'No Post Found'}));

                return res.json({msg:'mil gya bc'})
             }).catch(err => res.status(400).json({postNotfound:'No Post Found'}) )
        ;

    });



// desc Send Email
//access private

router.post('/send-email',passposrt.authenticate('Company',{session:false}),
    (req,res)=> {

        const output = `
        <p>You have a new message</p>
        <h3>Message Details</h3>
        <ul>  
          <li>Name: ${req.body.name}</li>
          <li>Sender: ${req.body.sender}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.msg}</p>`;

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: req.body.sender,
                pass: req.body.password
            },
            tls:{
                rejectUnauthorized:false
            }

        });

        // setup email data with unicode symbols
        let mailOptions = {
            from:req.body.sender, // sender address
            to:req.body.email , // list of receivers
            subject: 'Node Contact Request', // Subject line
            text: req.body.msg, // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
});







module.exports = router;

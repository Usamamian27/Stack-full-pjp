// authentication info
const express = require('express');
const router = express.Router();
const mongoose =require('mongoose');
const passposrt = require('passport');

// Post Model
const Post = require('../../../models/Post');
//Company Model
const Company = require('../../../models/Company');
//Student Model
const Student = require('../../../models/Students');


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

                // if(post.comments.filter(comment => comment.student.toString() === req.user.id)){
                //     // get an index to remove
                //             const removeIndex = post.comments
                //             .map(item => item._id.toString())
                //             .indexOf(req.params.comment_id);

                //         // Splice out of array
                //         post.comments.splice(removeIndex,1);
                //         //save
                //         post.save().then(post => res.json(post));
                // }else{
                //     return res.status((400).json({msg:'Not Authenticated'}));
                // }

                // if(post.comments.filter(comment => comment.user.toString() === req.user.id)){
                //     // get an index to remove
                //     const removeIndex = post.comments
                //         .map(item => item._id.toString())
                //         .indexOf(req.params.comment_id);

                //     // Splice out of array
                //     post.comments.splice(removeIndex,1);
                //     //save
                //     post.save().then(post => res.json(post));
                // }else{
                //     return res.status((400).json({msg:'Not Authenticated'}));
                // }


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




module.exports = router;

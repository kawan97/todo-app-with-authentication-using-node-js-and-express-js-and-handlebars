const express = require('express');
const router = express.Router();
const {userAuthenticated} = require('./auth');

const Post =require('../models/Post');
const User =require('../models/User');


router.get('/',(req,res) => {
    Post.find({}).populate('user').lean()
    .then(posts =>{
    res.render('post/index',{posts,posts})
    })
    .catch(err => res.send(err));

 })
 
 router.get('/create',userAuthenticated,(req,res) => {
    res.render('post/create');
 });

 router.post('/create',userAuthenticated,(req,res) => {
    Post.create({ title: req.body.title,info: req.body.info,user:req.user.id})
    .then(newdata => res.send(newdata))
    .catch(err =>   res.send(err)
    );
});


   
//s
 router.get('/update/:id',(req,res) => {
   Post.findOne({'_id' : req.params.id}).populate('user').lean()
    .then(post =>{
      if(post){

       return res.render('post/update',{post:post})

      }
    //res.render('post/index',{posts,posts})
    })
    .catch(err => res.send('Fuck Your Self'));
    //res.send('Fuck Your Self')
 });

 //  res.render('user/update')

 
 router.put('/update/:id',(req,res) => {
  Post.findOne({'_id' : req.params.id}).populate('user')
  .then(post =>{
    post.title=req.body.title;
    post.info=req.body.info;
    post.save();
    res.json({'title' : post.title})
  //res.render('post/index',{posts,posts})
  })
  .catch(err => res.send('fuck ur self'));
 });
 
 router.delete('/delete/:id',(req,res) => {
  Post.findOneAndDelete(req.params.id)
  .then(res.status(200).json({ message: "Successful" }))
  .catch(err => next(err));
 });


module.exports = router;
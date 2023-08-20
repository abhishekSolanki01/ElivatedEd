
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router()

//db
const Admin = require('../db/admin');
const Course = require('../db/course')
const User = require('../db/user')


//middleware
const { userAuth, courseValidation, SECRET } = require('../middleware');

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const addUser = await User.exists({username})
    if(addUser){
      res.status(403).json({ message: 'User already exists' });
    }else{
      const addNewUser = new User({username, password})
      await addNewUser.save(); 
      const token = await jwt.sign({username, password}, SECRET, {expiresIn: "1h"});
      res.json({ message: 'User created successfully', token });
    }
  });
  
  router.post('/login', async (req, res) => {
    const { username, password } = req.headers;
    const user = await User.exists({ username, password });
    if(user){
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '100h' });
      res.json({ message: 'Logged in successfully', token });
    }else{
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
  
  router.get('/courses', userAuth, async (req, res) => {
    const courses = await Course.find({published: true});
    res.json({ courses });
  });
  
  router.get('/courses/:courseId', userAuth, async (req, res) => {
    const { courseId } = req.params;
    const courseById = await Course.findById(courseId)
  
    if(courseById){
      res.json(courseById);
    }else{
      res.status(404).json({ message: 'Course not found' });
    }
  
  });
  
  router.post('/courses/:courseId', userAuth, async (req, res) => {
    const {courseId} = req.params;
    const course = await Course.findById(courseId);
    if(course){
      const user = await User.findOne({username: req.user.username});
      user.purchasedCourses.push(course);
      await user.save()
      res.json({ message: 'Course purchased successfully' });
    }else{
      res.status(404).json({ message: 'Course not found' });
    }
  
  });
  
  router.get('/purchasedCourses', userAuth, async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    if(user){
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    }else {
      res.status(403).json({ message: 'User not found' });
    }
  });

  module.exports = router;
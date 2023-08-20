
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router()

//db
const Admin = require('../db/admin');
const Course = require('../db/course')

//middleware
const { auth, courseValidation, SECRET } = require('../middleware');




router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
  
    const alreadyAnAdmin = await Admin.exists({username});
    if(alreadyAnAdmin){
      res.status(403).send({message: 'Admin already exists'})
    }else{
      const obj = { username, password };
      const adminToBeAdd = new Admin(obj)
      const saveAdmin = await adminToBeAdd.save();
      const token = jwt.sign({username, role: 'admin'}, SECRET, { expiresIn: '100h' })
      res.json({ message: 'Admin created successfully', token });
    }
  });
  
  router.post('/login', async(req, res) => {
    const {username, password} = req.headers;
    const ifAdminExist = await Admin.exists({ username, password });
    if(ifAdminExist){
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '100h' });
      res.json({ message: 'Logged in successfully', token });
    }else{
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
  
  router.post('/courses', auth, courseValidation ,async(req, res) => {
    const { title, description, price, imageLink, published } = req.body;
    const obj = {title, description, price, imageLink, published };
    const courseDB = new Course(obj);
    await courseDB.save()
    res.json({ message: 'Course created successfully', courseId: courseDB.id });
  
  });
  
  router.get('/courses/:courseId', auth, async (req, res) => {
    const { courseId } = req.params;
    const courseById = await Course.findById(courseId)
  
    if(courseById){
      res.json(courseById);
    }else{
      res.status(404).json({ message: 'Course not found' });
    }
  
  });
  
  router.put('/courses/:courseId', auth, async (req, res) => {
    const { courseId } = req.params;
    const { title, description, price, imageLink, published } = req.body;
    const updateCourseById = await Course.findByIdAndUpdate(courseId, { title, description, price, imageLink, published }, { new: true })
  
    if(updateCourseById){
      res.json({ message: 'Course updated successfully' });
    }else{
      res.status(404).json({ message: 'Course not found' });
    }
  
  });
  
  router.get('/courses', auth, async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
  });

  module.exports = router
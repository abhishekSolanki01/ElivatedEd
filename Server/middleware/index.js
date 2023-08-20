const express = require('express');
const jwt = require('jsonwebtoken');
const SECRET = 'Secret001'; 

const Admin = require('../db/admin')
const User = require('../db/user');

const auth = async (req, res, next) => {
    try{
      const authorization = req.headers.authorization;
    if(!authorization){
      console.log("Unauth");
      return res.status(403).send({message: "Unauthorised"})
    }
    const token = authorization.split(" ")[1];
    const decodeToken = await jwt.verify(token, SECRET);
  
    const adminUser = await Admin.exists({username: decodeToken.username})
    if(adminUser){
      req.user = decodeToken
      next();
    }else{
      return res.status(401).send({message: "Unauthorised"});
    }
  
    }catch(err){
      return res.status(401).send({message: "Unauthorised"});
    }
  }
  
const userAuth = async (req, res, next) => {
try{
    const authorization = req.headers.authorization;
    if(!authorization){
    return res.status(403)
    }
    const token = authorization.split(" ")[1];
    const decodeToken = await jwt.verify(token, SECRET);
    let user;
    if(decodeToken){
        user = await User.exists({username: decodeToken.username})
    }
    if(user){
    req.user = decodeToken
    next();
    }else{
    return res.status(403).json({ message: 'User not found' });
    }
}catch(e){
    return res.status(403).json({ message: 'User not found' });
}
}
  
const courseValidation = (req, res, next) => {
const { title, description, price, imageLink, published } = req.body;
const schema = Joi.object({
    title : Joi.string().max(100).required(), 
    description: Joi.string().max(100), 
    price: Joi.number().required(), 
    imageLink: Joi.string(), 
    published: Joi.boolean()
})
const {value, error} = schema.validate(req.body);
if(error){
    return res.status(403).send({error})
}
next()
}

module.exports = {
    auth,
    userAuth,
    courseValidation,
    SECRET
}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const courseSchema = new Schema({
    title : String, 
    description: String, 
    price: Number, 
    imageLink: String, 
    published: Boolean,
    summary: Array,
  })

  const Course = model('course', courseSchema)

module.exports = Course
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const model = mongoose.model;

const adminSchema = new Schema({
    username: String,
    password: String
  })
  const Admin = model('admin', adminSchema)
  
  module.exports = Admin;
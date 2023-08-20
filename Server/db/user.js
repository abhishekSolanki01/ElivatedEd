const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
    username: String,
    password: String,
    purchasedCourses: [{ type: Schema.Types.ObjectId, ref: 'course' , unique: true}]
  })

const User = model('user', userSchema)

module.exports = User;
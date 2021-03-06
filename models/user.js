const config=require("config")
const jwt=require("jsonwebtoken")
const mongoose = require("mongoose");
const Joi = require("joi");

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique:true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean
});

function validateUser(data) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(data);
}

userSchema.methods.generateAuthToken= function(){
  const token=jwt.sign({_id: this._id,isAdmin:this.isAdmin}, config.get("jwtPrivateKey"));
  return token
}

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.validateUser = validateUser;
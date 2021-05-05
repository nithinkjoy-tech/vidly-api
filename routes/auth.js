const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {User} = require("../models/user");
const Joi = require("joi");
const validate=require("../middleware/validate")

router.post("/",validate(validateUser), async (req, res) => {

  let user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");
  
  res.send(token);
});
  
function validateUser(data) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validateUser(data); 
}

module.exports = router;

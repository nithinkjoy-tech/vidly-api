const mongoose = require("mongoose");
const Joi = require("joi");

let customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
  },
  phone: {
    type: String,
    required: true,
    minlength:5,
    maxlength:12
  },
});

const Customer = mongoose.model("customer", customerSchema);

function validateCustomer(data) {
  let schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().min(3).max(25).required(),
    phone:Joi.string().min(5).max(12).required()
  });

  return schema.validate(data);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;

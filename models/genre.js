const mongoose = require("mongoose");
const Joi = require("joi");

let genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

function validateGenre(data) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(data);
}

const Genre = mongoose.model("Genre", genreSchema);

exports.genreSchema=genreSchema
exports.Genre = Genre;
exports.validateGenre = validateGenre;

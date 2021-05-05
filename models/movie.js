const mongoose=require("mongoose")
const Joi=require("joi")
const {genreSchema}=require("./genre")

const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        minlength:3,
        maxlength:255,
        required:true,
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255,
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255,
    }
})

const Movie=mongoose.model("Movie",movieSchema)

function validateMovie(data){
    const schema=Joi.object({
        title:Joi.string().min(3).max(255).required(),
        genreId:Joi.objectId().required(),
        numberInStock:Joi.number().min(0).max(255).required(),
        dailyRentalRate:Joi.number().min(0).max(255).required()
    })
    return schema.validate(data)
}

exports.Movie=Movie
exports.movieSchema=movieSchema
exports.validateMovie=validateMovie
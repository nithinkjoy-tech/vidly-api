const express = require("express")
const router = express.Router()
const { Movie, validateMovie } = require("../models/movie")
const validate=require("../middleware/validate")
const { Genre } = require("../models/genre")

router.get("/", async (req, res) => {
    const movies = await Movie.find().sort("name")
    res.send(movies)
})

router.post("/", validate(validateMovie),async (req, res) => {
    // const { error } = validateMovie(req.body)
    // if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send("Invalid genre Id")

   const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        }, 
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    await movie.save()
    res.send(movie)
})

router.put("/:id",validate(validateMovie), async (req, res) => {

    let movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(movie)
})
 
router.delete("/:id", async (req, res) => {
    let movie = await Movie.findByIdAndRemove(req.params.id)
    if (!movie) return res.status(400).send("Movie with given Id not found")

    res.send(movie)
})

router.get("/:id", async (req, res) => {
    let movie = await Movie.findById(req.params.id)
    if (!movie) return res.status(400).send("Movie with given Id not found")
    res.send(movie)
})

module.exports = router
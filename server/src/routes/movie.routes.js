const router = require("express").Router();
const movieController = require("../controller/movie.controller")
const movie = require("../config/movie.json");
const Movie = require("../model/movie");


router.get("/moveies", movieController.getMovies);

const insertMovie = async (req, res) => {
  try {
      const docs =  await Movie.insertMany(movie)
      return Promise.resolve(docs)

  } catch (error) {
    console.log(error);
    return Promise.reject(error)
  }
}

insertMovie()
.then((docs) => console.log(docs))
.catch((error) => console.log(error))


module.exports = router

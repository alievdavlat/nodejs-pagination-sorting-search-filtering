const Movie = require("../model/movie");


module.exports = {
  getMovies: async (req, res) => {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || "";
      let sort = req.query.sort || "rating";
      let genre = req.query.genre || "all";
  
      const genreOptions = [
        "action",
        "romance",
        "fantasy",
        "drama",
        "crime",
        "adventure",
        "thriller",
        "sci-fi",
        "music",
        "family",
      ];
  
      genre === "all"
        ? (genre = [...genreOptions])
        : (genre = req.query.genre.split(","));
  
      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
  
      let sortBy = {};
  
      if (sort[1]) {
        sortBy[sort[0]] = sort[1];
      } else {
        sortBy[0] = "asc";
      }
  
      const movies = await Movie.find({
        name: { $regex: { search }, $options: "i" },
      })
        .where("genre")
        .in([...genre])
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit)
  
      const total = await Movie.countDocuments({
        genre:{$in: [...genre]},
        name: { $regex: { search }, $options: "i" },
      })
  
      const response = {
        error: false ,
        total, 
        page: page + 1,
        limit,
        genres: genreOptions,
        data:movies
      }
  
      res.status(200).json(response)
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: true, message: 'Internal Server Error!', data: null, error})
    }
  },

 

}
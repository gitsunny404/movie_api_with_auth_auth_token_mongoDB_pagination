import Movie from "../models/movie.model.js";

export async function CreateMovie(req, res) {
  try {
    const movie = new Movie({
      ...req.body,
    });

    // Save the movie to the database
    await movie.save();

    // Respond with the created movie
    res.status(201).json({
      status: "success",
      id: movie.id,
      name: movie.name,
      message: "Movie created successfully !!!",
    });
  } catch (error) {
    // console.error("Error creating movie:", error.message);
    res.status(500).json({
      status: "failed",
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export async function GetMovie(req, res) {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    // console.error("Error fetching movies:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function GetMovieByID(req, res) {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        error: "Movie not found",
        message: `Movie with ID ${req.params.id} not found`,
      });
    }
    res.json(movie);
  } catch (error) {
    // console.error("Error fetching movie by ID:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export async function UpdateMovieByID(req, res) {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie) {
      return res
        .status(404)
        .json({ error: `Movie not found with id ${req.params.id}` });
    }
    res.json({
      status: "success",
      id: movie.id,
      message: "Movie updated successfully!!!",
    });
  } catch (error) {
    // console.error("Error updating movie by ID:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export async function DeleteMovieByID(req, res) {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    // console.error("Error deleting movie by ID:", error.message);
    res.status(500).json({
      status: "failed",
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

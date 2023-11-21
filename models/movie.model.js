import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  actor: {
    type: String,
    required: true,
  },
  actress: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "Action",
      "Drama",
      "Comedy",
      "Sci-Fi",
      "Thriller",
      "Other",
      "Crime",
      "Adventure",
    ],
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  productionCost: {
    type: Number,
    required: true,
  },
  boxOfficeEarnings: {
    type: Number,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  durationMinutes: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  awards: {
    type: [String], // Array of strings representing awards
  },
  languages: {
    type: [String], // Array of strings representing languages
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  posterURL: {
    type: String,
    required: true,
  },
  trailerURL: {
    type: String,
    required: true,
  },
  cast: {
    type: [
      {
        actor: String,
        role: String,
      },
    ],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Movie = mongoose.model("MovieSchema", movieSchema);

export default Movie;

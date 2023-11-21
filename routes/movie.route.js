import express from "express";
import {
  CreateMovie,
  GetMovie,
  GetMovieByID,
  UpdateMovieByID,
  DeleteMovieByID,
} from "../controllers/movie.controller.js";
import { requireToken } from "../middlewares/webtokens.middleware.js";
const router = express.Router();

// Create a new movie
router.post("/movies", CreateMovie);

// Get all movies
router.get("/movies", requireToken, GetMovie);

// Get a specific movie by ID
router.get("/movies/:id", requireToken, GetMovieByID);

// Update a movie by ID
router.put("/movies/:id", requireToken, UpdateMovieByID);

// Delete a movie by ID
router.delete("/movies/:id", requireToken, DeleteMovieByID);

// un-protected paths
// Get all movies
router.get("/unprotected/movies", GetMovie);

// Get a specific movie by ID
router.get("/unprotected/movies/:id", GetMovieByID);

// Update a movie by ID
router.put("/unprotected/movies/:id", UpdateMovieByID);

// Delete a movie by ID
router.delete("/unprotected/movies/:id", DeleteMovieByID);

export default router;

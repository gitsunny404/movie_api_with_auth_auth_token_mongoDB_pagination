import express from "express";
import {
  CreateUser,
  GetUser,
  GetUserByID,
  UpdateUserByID,
  DeleteUserByID,
  LoginUser,
} from "../controllers/user.controller.js";
import { requireToken } from "../middlewares/webtokens.middleware.js";

const router = express.Router();

// Create a new user
router.post("/users", CreateUser);

// Get all users
router.get("/users", requireToken, GetUser);

// Get a specific user by ID
router.get("/users/:id", requireToken, GetUserByID);

// Update a user by ID
router.patch("/users/:id", requireToken, UpdateUserByID);

// Delete a user by ID
router.delete("/users/:id", requireToken, DeleteUserByID);

// Login User
router.post("/login", LoginUser);

// un-protected paths

// Get all users
router.get("/unprotected/users", GetUser);

// Get a specific user by ID
router.get("/unprotected/users/:id", GetUserByID);

// Update a user by ID
router.patch("/unprotected/users/:id", UpdateUserByID);

// Delete a user by ID
router.delete("/unprotected/users/:id", DeleteUserByID);

export default router;

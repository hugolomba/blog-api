import { Router } from "express";
import { createUser, deleteUser, editUser, getAllUsers, getUserById } from "./userControllers.js";

const userRoutes = Router();


// Create a User
userRoutes.post("/", createUser)

// Get all Users
userRoutes.get("/", getAllUsers)

// Find a user
userRoutes.get("/:id", getUserById)

// Edit a user
userRoutes.put("/:id", editUser);

// Delete a user
userRoutes.delete("/:id", deleteUser)

export default userRoutes;

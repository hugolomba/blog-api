import { Router } from "express";
import { createPost, getAllPosts } from "./postControllers.js"
const postRoutes = Router();


// Create a post
postRoutes.post("/", createPost)

// Get all posts
postRoutes.get("/", getAllPosts)

// Get all PUBLISHED posts


// Find a post
// postRoutes.get("/:id", getpostById)

// Edit a post
// postRoutes.put("/:id", editpost);

// Delete a post
// userRoutes.delete("/:id", deleteUser)

export default postRoutes;

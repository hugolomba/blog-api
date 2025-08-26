import { Router } from "express";
import { createPost, getAllPosts, getAllPublishedPosts, editPost, deletePost, getPostById } from "./postControllers.js"
const postRoutes = Router();


// Create a post
postRoutes.post("/", createPost)

// Get all posts
postRoutes.get("/all", getAllPosts)
// add a security layer to show only posts by the author

// Get all PUBLISHED posts
postRoutes.get("/published", getAllPublishedPosts)

// Find a post
postRoutes.get("/:id", getPostById)

// Edit a post
postRoutes.put("/:id", editPost);

// Delete a post
postRoutes.delete("/:id", deletePost)

export default postRoutes;

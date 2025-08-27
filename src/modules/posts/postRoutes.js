import { Router } from "express";
import { createPost, getAllPosts, getAllPublishedPosts, editPost, deletePost, getPostById, likePost } from "./postControllers.js"
import { validateAndSanitize } from "../../middlewares/validateAndSanitize.js";
import { createPostSchema, editPostSchema } from "../../config/joiSchemas.js";

const postRoutes = Router();


// Create a post
postRoutes.post("/", validateAndSanitize(createPostSchema), createPost)

// Get all posts
postRoutes.get("/all", getAllPosts)
// add a security layer to show only posts by the author

// Get all PUBLISHED posts
postRoutes.get("/published", getAllPublishedPosts)

// Find a post
postRoutes.get("/:id", getPostById)

// Edit a post
postRoutes.put("/:id", validateAndSanitize(editPostSchema), editPost);

// Delete a post
postRoutes.delete("/:id", deletePost)

// Like a post
postRoutes.post("/:id/like", likePost);

export default postRoutes;

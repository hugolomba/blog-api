import { Router } from "express";
import { createPost, getAllPosts, getAllPublishedPosts, editPost, deletePost, getPostById, likePost, getAllCurrentUserPosts, searchPosts, savePost } from "./postControllers.js"
import { validateAndSanitize } from "../../middlewares/validateAndSanitize.js";
import { createPostSchema, editPostSchema } from "../../config/joiSchemas.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { isAdmin } from "../../middlewares/isAdmin.js";

const postRoutes = Router();


// Create a post
postRoutes.post("/", authMiddleware, validateAndSanitize(createPostSchema), createPost)

// Get all posts
postRoutes.get("/all", authMiddleware, isAdmin, getAllPosts)

// Get all Current User Posts
postRoutes.get("/me", authMiddleware, getAllCurrentUserPosts)

// Get all PUBLISHED posts
postRoutes.get("/published", getAllPublishedPosts)

// Edit a post
postRoutes.put("/edit", authMiddleware, validateAndSanitize(editPostSchema), editPost);

// Delete a post
postRoutes.delete("/delete", authMiddleware, deletePost)

// Like a post
postRoutes.post("/:id/like", authMiddleware, likePost);

// Save a post
postRoutes.post("/:id/save", authMiddleware, savePost);

// Search posts
postRoutes.get("/search", searchPosts);

// Find a post
postRoutes.get("/:id", authMiddleware, getPostById)

export default postRoutes;

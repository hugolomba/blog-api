import { Router } from "express";
import { createPost, getAllPosts, getAllPublishedPosts, editPost, deletePost, getPostById, likePost, getAllCurrentUserPosts, searchPosts, savePost, getCommentsByPost } from "./postControllers.js"
import { validateAndSanitize } from "../../middlewares/validateAndSanitize.js";
import { createPostSchema, editPostSchema } from "../../config/joiSchemas.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { isAdmin } from "../../middlewares/isAdmin.js";
import upload from "../../config/multer.js";

const postRoutes = Router();

 
// Create a post
postRoutes.post("/", authMiddleware, validateAndSanitize(createPostSchema), upload.single("coverImage"), createPost)

// Get all posts
postRoutes.get("/all", authMiddleware, isAdmin, getAllPosts)

// Get all Current User Posts
postRoutes.get("/me", authMiddleware, getAllCurrentUserPosts)

// Get all PUBLISHED posts
postRoutes.get("/published", getAllPublishedPosts)
// Edit a post
postRoutes.put("/:id", authMiddleware, upload.single("coverImage"), editPost);

// Delete a post
postRoutes.delete("/:id", authMiddleware, deletePost)

// Like a post
postRoutes.post("/:id/like", authMiddleware, likePost);

// Save a post
postRoutes.post("/:id/save", authMiddleware, savePost);

// Search posts
postRoutes.get("/search", searchPosts);

//find all comments by post
postRoutes.get("/:id/comments", getCommentsByPost)

// Find a post
postRoutes.get("/:id", getPostById)



export default postRoutes;

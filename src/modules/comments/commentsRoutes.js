import { Router } from "express";
import { createComment } from "./commentsControllers.js"
const commentRoutes = Router();


// Create a comment
commentRoutes.post("/", createComment)

// Get all comments
// commentRoutes.get("/", getAllComments)

// Get all PUBLISHED comments
// commentRoutes.get("/published", getPublishedComments)

// Find a comment
// commentRoutes.get("/:id", getCommentById)

// Edit a comment
// commentRoutes.put("/:id", editComment);

// Delete a comment
// commentRoutes.delete("/:id", deleteComment);

export default commentRoutes;

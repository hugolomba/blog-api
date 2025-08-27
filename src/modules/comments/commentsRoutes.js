import { Router } from "express";
import { createComment, getAllComments, getCommentById, getCommentsByAuthor, editComment, deleteComment, likeComment } from "./commentsControllers.js"
import { authMiddleware } from "../../middlewares/authMiddleware.js";
const commentRoutes = Router();


// Create a comment
commentRoutes.post("/", authMiddleware, createComment)

// Get all comments
commentRoutes.get("/", authMiddleware, getAllComments)


// Find a comment by Id
commentRoutes.get("/:id", getCommentById)

// Find a comment by author
commentRoutes.get("/author/:authorId", getCommentsByAuthor)

// Edit a comment
commentRoutes.put("/:id", authMiddleware, editComment);

// Delete a comment
commentRoutes.delete("/:id", authMiddleware, deleteComment);

// Like a comment
commentRoutes.post("/:id/like", authMiddleware, likeComment);

export default commentRoutes;

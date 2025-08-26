import { Router } from "express";
import { createComment, getAllComments, getCommentById, getCommentsByAuthor, editComment, deleteComment, likeComment } from "./commentsControllers.js"
const commentRoutes = Router();


// Create a comment
commentRoutes.post("/", createComment)

// Get all comments
commentRoutes.get("/", getAllComments)


// Find a comment by Id
commentRoutes.get("/:id", getCommentById)

// Find a comment by author
commentRoutes.get("/author/:authorId", getCommentsByAuthor)

// Edit a comment
commentRoutes.put("/:id", editComment);

// Delete a comment
commentRoutes.delete("/:id", deleteComment);

// Like a comment
commentRoutes.post("/:id/like", likeComment);

export default commentRoutes;

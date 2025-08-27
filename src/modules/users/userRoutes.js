import { Router } from "express";
import { deleteUser, editUser, getAllUsers, getCurrentUser, getUserById } from "./userControllers.js";
import upload from "../../config/multer.js";
import { validateAndSanitize } from "../../middlewares/validateAndSanitize.js";
import { updateProfileSchema } from "../../config/joiSchemas.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";


const userRoutes = Router();


// Create a User
// userRoutes.post("/", upload.single("avatarImage"), createUser)

// Get all Users (only for admins)
userRoutes.get("/", authMiddleware, getAllUsers)




userRoutes.get("/me", authMiddleware, getCurrentUser);

// Find a user (public profile)
userRoutes.get("/:id", getUserById)

// Edit a user
userRoutes.put("/:id", upload.single("avatarImage"), validateAndSanitize(updateProfileSchema), authMiddleware, editUser);

// Delete a user
userRoutes.delete("/:id", authMiddleware, deleteUser)

export default userRoutes;

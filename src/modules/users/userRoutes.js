import { Router } from "express";
import { deleteUser, editUser, getAllUsers, getCurrentUser, getUserById, changePassword, searchUsers } from "./userControllers.js";
import upload from "../../config/multer.js";
import { validateAndSanitize } from "../../middlewares/validateAndSanitize.js";
import { updateProfileSchema, updatePasswordSchema } from "../../config/joiSchemas.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { isAdmin } from "../../middlewares/isAdmin.js"


const userRoutes = Router();


// Create a User
// userRoutes.post("/", upload.single("avatarImage"), createUser)

// Get all Users (only for admins)
userRoutes.get("/all", authMiddleware, isAdmin, getAllUsers)


// Get the current user
userRoutes.get("/me", authMiddleware, getCurrentUser);

// Change password
userRoutes.put("/change-password", validateAndSanitize(updatePasswordSchema), authMiddleware, changePassword);
 
// Edit user
userRoutes.put("/edit/:id", authMiddleware, upload.single("avatarImage"), validateAndSanitize(updateProfileSchema), editUser);

// Change Password
userRoutes.put("/change-password", validateAndSanitize(updatePasswordSchema), authMiddleware, changePassword);

// Delete a user
userRoutes.delete("/delete", authMiddleware, deleteUser)

// Search for users
userRoutes.get("/search", searchUsers);

// Find a user (public profile)
userRoutes.get("/:id", getUserById)


export default userRoutes;

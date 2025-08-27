import { Router } from "express";
import { deleteUser, editUser, getAllUsers, getUserById } from "./userControllers.js";
import upload from "../../config/multer.js";
import { validateAndSanitize } from "../../middlewares/validateAndSanitize.js";
import { updateProfileSchema } from "../../config/joiSchemas.js";

const userRoutes = Router();


// Create a User
// userRoutes.post("/", upload.single("avatarImage"), createUser)

// Get all Users
userRoutes.get("/", getAllUsers)

// Find a user
userRoutes.get("/:id", getUserById)

// Edit a user
userRoutes.put("/:id", upload.single("avatarImage"), validateAndSanitize(updateProfileSchema), editUser);

// Delete a user
userRoutes.delete("/:id", deleteUser)

export default userRoutes;

import { Router } from "express";
import { register, login } from "./authController.js";
import upload from "../../config/multer.js";
import { validateAndSanitize } from "../../middlewares/validateAndSanitize.js";
import { registerSchema, loginSchema } from "../../config/joiSchemas.js";

const authRouter = Router();



authRouter.post("/register", upload.single("avatarImage"), validateAndSanitize(registerSchema), register);
authRouter.post("/login", validateAndSanitize(loginSchema), login);

export default authRouter;
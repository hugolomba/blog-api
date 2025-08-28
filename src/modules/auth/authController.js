import prisma from "../../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt.js";
import cloudinary from "../../config/cloudinary.js";


const response = (success, data, message, error) => {
    return {
        success,
        data,
        message,
        error
    };
}

export async function register (req, res, next) {
    let { name, username, email, password, bio, avatarImage } = req.body

    try {
        const existingEmail = await prisma.user.findUnique({
            where: { email }
        });
        const existingUsername = await prisma.user.findUnique({
            where: { username }
        });

        if (existingEmail) {
            return res.status(409).json({ message: "Email already exists" });
        }

        if (existingUsername) {
            return res.status(409).json({ message: "Username already taken" });
        }

        // hash password
        
        const hashedPassword = await bcrypt.hash(password, 10);

        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: "users/avatar",
                transformation: [{ width: 800, height: 600, crop: "limit" }]
            });
            avatarImage = uploadResult.secure_url
        }

        const user = await prisma.user.create({
        data: {name, username, email, password: hashedPassword, bio, avatarImage}
    })
    res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

export async function login (req, res, next) { 
   
    let { username, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: { username }, 
            include: {
                posts: true,
                comments: true,
                likes: true,
                followers: true,
                following: true,
                savedPosts: true
            }
        });
        
         if (!user) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

     const isPasswordValid = await bcrypt.compare(password, user.password);
   
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username, isAdmin: user.isAdmin },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    res.status(200).json({ user, token })
   
    } catch (error) {
        next(error)
    }
}

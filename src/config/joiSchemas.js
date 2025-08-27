import Joi from "joi";

// schema to check register
export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  username: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  bio: Joi.string().max(200).optional(),
  avatarImage: Joi.string().uri().optional()
});

// Schema Joi for login
export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

// Schema Joi to update a Profile
export const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  username: Joi.string().alphanum().min(3).max(20).optional(),
  email: Joi.string().email().optional(),
  bio: Joi.string().max(200).optional(),
  avatarImage: Joi.string().uri().optional()
});

// Schema Joi to create a Post
export const createPostSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  content: Joi.string().min(10).required(),
  coverImage: Joi.string().uri().optional(),
  authorId: Joi.number().required()
});

// Schema Joi to edit a Post
export const editPostSchema = Joi.object({
  title: Joi.string().min(3).max(200).optional(),
  content: Joi.string().min(10).optional(),
  coverImage: Joi.string().uri().optional(),
  authorId: Joi.number().optional()
});
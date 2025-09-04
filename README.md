# Blog API

A blog API built with Node.js, Express, and Prisma. It supports JWT authentication, image upload (Multer + Cloudinary), data validation (Joi), and provides endpoints for users, posts, and comments.

## Table of Contents
- [Stack](#stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Routes](#routes)
  - [Auth](#auth)
  - [Users](#users)
  - [Posts](#posts)
  - [Comments](#comments)
- [Error Handling & Middleware](#error-handling--middleware)
- [Contributing](#contributing)
- [License](#license)

## Stack
- **Node.js** 18+
- **Express** 5
- **Prisma** (ORM)
- **PostgreSQL** (or other Prisma-supported DB)
- **JWT** for authentication
- **Multer + Cloudinary** for file uploads
- **Joi** for input validation
- **bcrypt/bcryptjs** for password hashing

## Installation
```bash
git clone <REPO_URL>
cd blog-api
npm install
npm run dev
```

By default the server runs at `http://localhost:3000`.

## Environment Variables
Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/blog_api"
JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN="1d"

CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
UPLOAD_DIR=./uploads
```

## Project Structure
```
src/
  config/
    cloudinary.js
    joiSchemas.js
    jwt.js
    multer.js
    prisma.js
  middlewares/
    authMiddleware.js
    errorHandler.js
    isAdmin.js
    validateAndSanitize.js
  modules/
    auth/
      authController.js
      authRoutes.js
    comments/
      commentsControllers.js
      commentsRoutes.js
    posts/
      postControllers.js
      postRoutes.js
    users/
      userControllers.js
      userRoutes.js
  utils/
  server.js
```

## Routes

### Auth
Base: `/auth`
- `POST /auth/register` → register a new user (with optional avatar)  
  Body: `username, email, password, avatarImage (file)`  
  Middlewares: `upload.single("avatarImage")`, `validateAndSanitize(registerSchema)`  
- `POST /auth/login` → user login  
  Body: `email, password`  
  Middlewares: `validateAndSanitize(loginSchema)`  

### Users
Base: `/users`
- `GET /users/all` → list all users (admin only)  
  Middlewares: `authMiddleware`, `isAdmin`  
- `GET /users/me` → get current authenticated user  
  Middlewares: `authMiddleware`  
- `PUT /users/change-password` → change user password  
  Body: `{ oldPassword, newPassword }`  
  Middlewares: `authMiddleware`, `validateAndSanitize(updatePasswordSchema)`  
- `PUT /users/edit/:id` → edit user profile (with optional avatar)  
  Body: `name?, email?, avatarImage? (file)`  
  Middlewares: `authMiddleware`, `upload.single("avatarImage")`, `validateAndSanitize(updateProfileSchema)`  
- `DELETE /users/delete` → delete current user  
  Middlewares: `authMiddleware`  
- `GET /users/search?query=<text>` → search users  
- `GET /users/:id` → get a user's public profile  

### Posts
Base: `/posts`
- `POST /posts/` → create a new post (with optional cover image)  
  Middlewares: `authMiddleware`, `validateAndSanitize(createPostSchema)`, `upload.single("coverImage")`  
- `GET /posts/all` → list all posts (admin only)  
  Middlewares: `authMiddleware`, `isAdmin`  
- `GET /posts/me` → list current user's posts  
  Middlewares: `authMiddleware`  
- `GET /posts/published` → list all published posts (public)  
- `PUT /posts/:id` → edit a post (with optional cover image)  
  Middlewares: `authMiddleware`, `upload.single("coverImage")`  
- `DELETE /posts/:id` → delete a post  
  Middlewares: `authMiddleware`  
- `POST /posts/:id/like` → like a post  
  Middlewares: `authMiddleware`  
- `POST /posts/:id/save` → save a post  
  Middlewares: `authMiddleware`  
- `GET /posts/search?query=<text>` → search posts  
- `GET /posts/:id/comments` → get all comments of a post  
- `GET /posts/:id` → get post by id  

### Comments
Base: `/comments`
- `POST /comments/` → create a new comment  
  Middlewares: `authMiddleware`  
- `GET /comments/` → list all comments  
  Middlewares: `authMiddleware`  
- `GET /comments/:id` → get comment by id  
- `GET /comments/author/:authorId` → get comments by author  
- `PUT /comments/:id` → edit a comment  
  Middlewares: `authMiddleware`  
- `DELETE /comments/:id` → delete a comment  
  Middlewares: `authMiddleware`  
- `POST /comments/:id/like` → like a comment  
  Middlewares: `authMiddleware`  

## Error Handling & Middleware
- `errorHandler.js` catches and formats errors as JSON.  
- Unknown routes return `{ error: "Not Found" }`.  
- Authentication handled by `authMiddleware` (JWT).  
- Admin-only routes require `isAdmin`.  
- Data validation via Joi in `validateAndSanitize`.  

## Contributing
1. Fork the repository  
2. Create your feature branch (`git checkout -b feature/my-feature`)  
3. Commit your changes (`git commit -m 'feat: add my feature'`)  
4. Push to the branch (`git push origin feature/my-feature`)  
5. Open a Pull Request  



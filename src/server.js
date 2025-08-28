import "dotenv/config";
import express from 'express';
import errorHandler from "./middlewares/errorHandler.js";
import userRoutes from "./modules/users/userRoutes.js";
import postRoutes from "./modules/posts/postRoutes.js";
import authRouter from "./modules/auth/authRoutes.js";
import commentRoutes from "./modules/comments/commentsRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173" // URL 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use('/users', userRoutes);
app.use('/auth', authRouter);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.use('/', (req, res) => {
  res.send('Hello from the API!');
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});



// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

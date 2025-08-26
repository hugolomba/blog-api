import prisma from "../../config/prisma.js";

const response = (success, data, message, error) => {
    return {
        success,
        data,
        message,
        error
    };
}

export async function createPost(req, res, next) {  
    const { title, content, coverImage, authorId } = req.body

    try {
        const newPost = await prisma.post.create({
            data: {title, content, coverImage, authorId}
        })

        res.status(200).json(response(true, newPost, "New post created", null))


    } catch (error) {
        next(error)
    }
}


// REMEMBER TO ADD SECURITY LAYER
export async function getAllPosts(req, res, next) {

    try {
        const allPosts = await prisma.post.findMany({
                include: {
                author: true,
                comments: true,
                likes: true,
                categories: true,
                savedBy: true
            }
        })

        res.status(200).json(response(true, allPosts, "All Posts", null))
    } catch (error) {
        next(error)
    }
}

// Get all PUBLISHED posts
export async function getAllPublishedPosts(req, res, next) {

    try {
        const allPosts = await prisma.post.findMany(
            {
                where: {
                    published: true
                },
                include: {
                author: true,
                comments: true,
                likes: true,
                categories: true,
                savedBy: true
            }
        })

        res.status(200).json(response(true, allPosts, "All Posts", null))
    } catch (error) {
        next(error)
    }
    
}

// Edit a Post
export async function editPost(req, res, next) {
    const { id } = req.params;
    const { title, content, coverImage, published } = req.body;

    try {
        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: { title, content, coverImage, published }
        });

        res.status(200).json(response(true, updatedPost, "Post updated", null));
    } catch (error) {
        next(error);
    }
}

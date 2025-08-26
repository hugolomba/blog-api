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
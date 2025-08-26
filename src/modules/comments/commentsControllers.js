import prisma from "../../config/prisma.js";

const response = (success, data, message, error) => {
    return {
        success,
        data,
        message,
        error
    };
}

export async function createComment(req, res, next) {  
    const { content, postId, authorId } = req.body

    try {
        const newComment = await prisma.comment.create({
            data: { content, postId, authorId }
        })

        res.status(200).json(response(true, newComment, "New comment created", null))


    } catch (error) {
        next(error)
    }
}



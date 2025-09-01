import prisma from "../../config/prisma.js";

const response = (success, data, message, error) => {
    return {
        success,
        data,
        message,
        error
    };
}

// Create a comment
export async function createComment(req, res, next) {  
    const authorId = req.user.userId
    const { content, postId } = req.body

    try {
        const newComment = await prisma.comment.create({
            data: { content, postId, authorId }
        })

        res.status(200).json(newComment)


    } catch (error) {
        next(error)
    }
}

// Get all comments
export async function getAllComments(req, res, next) {

    try {
        const allComments = await prisma.comment.findMany({
            include: {
                author: true,
                post: true,
                likes: true
            }
        })

        res.status(200).json(allComments)
    } catch (error) {
        next(error)
    }
}

// Find a comment by Id
export async function getCommentById(req, res, next) {
    const { id } = req.params

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: Number(id) },
            include: {
                author: true,
                post: true,
                likes: true
            }
        })

        if (!comment) return next({ status: 404, message: "Comment not found", code: "NOT_FOUND" })

        res.status(200).json(comment)
    } catch (error) {
        next(error)
    }
}

// Find a comment by author
export async function getCommentsByAuthor(req, res, next) {
    const { authorId } = req.params

    try {
        const comments = await prisma.comment.findMany({
            where: { authorId: Number(authorId) },
            include: {
                author: true,
                post: true,
                likes: true
            }
        })

        if (!comments) return next({ status: 404, message: "Comments not found", code: "NOT_FOUND" })

        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}

// Edit a comment
export async function editComment(req, res, next) {
    const { id } = req.params
    const { content } = req.body

    try {
        const updatedComment = await prisma.comment.update({
            where: { id: Number(id) },
            data: { content }
        })

        res.status(200).json(updatedComment)
    } catch (error) {
        next(error)
    }
}

// Delete a comment
export async function deleteComment(req, res, next) {
    const { id } = req.params

    try {
        const deletedComment = await prisma.comment.delete({
            where: { id: Number(id) }
        })

        res.status(200).json(deletedComment)
    } catch (error) {
        next(error)
    }
}

// Like a comment
export async function likeComment(req, res, next) {
    const { id: commentId } = req.params
    const { userId } = req.user

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: Number(commentId) }
        })

        if (!comment) return next({ status: 404, message: "Comment not found", code: "NOT_FOUND" })

        const like = await prisma.like.create({
            data: {
                userId: Number(userId),
                
                commentId: Number(commentId)
            }
        })

        res.status(200).json("Comment liked")
    } catch (error) {
        next(error)
    }
}

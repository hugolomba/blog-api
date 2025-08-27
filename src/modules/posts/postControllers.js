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
                comments: {
                    include: {
                        author: true,
                        likes: true
                    }
                },
                likes: true,
                categories: true,
                savedBy: true
            }, orderBy: {
                id: "asc"
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
                comments: {
                    include: {
                        author: true,
                        likes: true
                    }
                },
                likes: true,
                categories: true,
                savedBy: true
            },  orderBy: {
                id: "asc"
            }
        })

        res.status(200).json(response(true, allPosts, "All Posts", null))
    } catch (error) {
        next(error)
    }
    
}

// Find a Post by id
export async function getPostById(req, res, next) {
    const { id } = req.params

    try {
        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
            include: {
                author: true,
                comments: {
                    include: {
                        author: true,
                        likes: true
                    }
                },
                likes: true,
                categories: true,
                savedBy: true
            },  orderBy: {
                id: "asc"
            }
        })

        if (!post) return next({ status: 404, message: "Post not found", code: "NOT_FOUND" })

        res.status(200).json(response(true, post, "Post fetched successfully", null))
    } catch (error) {
        next(error)
    }
}

// Edit a Post
export async function editPost(req, res, next) {
    const { id } = req.params;
    const { title, content, coverImage, published } = req.body;

    try {

        const existingPost = await prisma.post.findUnique({
            where: { id: Number(id) }
        });

        const dataToUpdate = {};
        const fields = { title, content, coverImage, published };

        for (const key in fields) {
            if (fields[key] !== undefined && fields[key] !== existingPost[key]) {
                dataToUpdate[key] = fields[key];
            }
        }

        if (Object.keys(dataToUpdate).length === 0) {
            return res.status(200).json(response(true, {}, "No fields were updated", null));
        }

        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data:   dataToUpdate
        });

        const updatedFieldsNames = Object.keys(dataToUpdate).join(", ");

        res.status(200).json(response(true, updatedPost, `Post updated successfully: ${updatedFieldsNames}`, null));
    } catch (error) {
        next(error);
    }
}

// Delete a Post
export async function deletePost(req, res, next) {
    const {id } = req.params
    try {

     const deletedPost = await prisma.post.delete({
        where: { id: Number(id) }
     })   

     res.status(200).json(response(true, deletedPost, `Post ${deletedPost.title} deleted`, null))

        
    } catch (error) {
        next(error)
    }
}

// Like a Post
export async function likePost(req, res, next) {
    const { id: postId } = req.params
    const { userId } = req.body

    try {
        const post = await prisma.post.findUnique({
            where: { id: Number(postId) }
        })

        if (!post) return next({ status: 404, message: "Post not found", code: "NOT_FOUND" })

        const like = await prisma.like.create({
            data: {
                userId: Number(userId),
                postId: Number(postId)
            }
        })

        res.status(200).json(response(true, like, "Post liked successfully", null))
    } catch (error) {
        next(error)
    }
}
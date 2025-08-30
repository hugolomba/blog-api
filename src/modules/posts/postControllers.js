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

        res.status(200).json("New post created")


    } catch (error) {
        next(error)
    }
}


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

        res.status(200).json(allPosts)
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

        res.status(200).json(allPosts)
    } catch (error) {
        next(error)
    }
    
}

//Get all Current User Posts

export async function getAllCurrentUserPosts(req, res, next) {
    try {
        const { userId } = req.user;
        const userPosts = await prisma.post.findMany({
            where: { authorId: Number(userId) },
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
    
        res.status(200).json(userPosts)
    } catch (error) {
        next(error)
    }
}

// Find a Post by id
export async function getPostById(req, res, next) {
    const { id } = req.params

    try {
        const post = await prisma.post.findUnique({
            where: { id: Number(id), published: true },
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
            }
        })

        if (!post || !post.published) return next({ status: 404, message: "Post not found", code: "NOT_FOUND" })

        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}

// Edit a Post
export async function editPost(req, res, next) {
    const id  = req.params.id;
    const { title, content, coverImage, published } = req.body;

    try {

        const existingPost = await prisma.post.findUnique({
            where: { id: Number(id) }
        });

        if (!existingPost) {
            return res.status(404).json(response(false, {}, "Post not found", null));
        }

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

        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
}

// Delete a Post
export async function deletePost(req, res, next) {
    const id = req.params.id;
    try {

     const deletedPost = await prisma.post.delete({
        where: { id: Number(id) }
     })   

     res.status(200).json(deletedPost)

        
    } catch (error) {
        next(error)
    }
}

// Like a Post
export async function likePost(req, res, next) {
    const { id: postId } = req.params
    // console.log("req.user:", req.user);
    const { userId } = req.user

    try {
        const post = await prisma.post.findUnique({
            where: { id: Number(postId) }
        })

        if (!post) return next({ status: 404, message: "Post not found", code: "NOT_FOUND" })

        const existingLike = await prisma.like.findFirst({
            where: {
                userId: Number(userId),
                postId: Number(postId)
            }
        });

        if (existingLike) {
            await prisma.like.delete({ where: { id: existingLike.id } });
            return res.status(200).json({ message: "Like removed" });
        } else {
            // if there is no like, add
            await prisma.like.create({
                data: {
                    userId: Number(userId),
                    postId: Number(postId)
                }
            });
            return res.status(200).json({ message: "Post liked" });
        }
    } catch (error) {
        next(error)
    }
}

// Save a Post
export async function savePost(req, res, next) {
    const { id: postId } = req.params
    // console.log("req.user:", req.user);
    const { userId } = req.user

    try {
        const post = await prisma.post.findUnique({
            where: { id: Number(postId) }
        })

        if (!post) return next({ status: 404, message: "Post not found", code: "NOT_FOUND" })

        const existingSave = await prisma.savedPost.findFirst({
            where: {
                userId: Number(userId),
                postId: Number(postId)
            }
        });

        if (existingSave) {
            await prisma.savedPost.delete({ where: { id: existingSave.id } });
            return res.status(200).json({ message: "Save removed" });
        } else {
            // if there is no save, add
            await prisma.savedPost.create({
                data: {
                    userId: Number(userId),
                    postId: Number(postId)
                }
            });
            return res.status(200).json({ message: "Post saved" });
        }
    } catch (error) {
        next(error)
    }
}

export async function searchPosts(req, res, next) {
    const { q } = req.query;

    try {
        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    { title: { contains: q, mode: "insensitive" } },
                    { content: { contains: q, mode: "insensitive" } }
                ],
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
            }
        });

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

// get all comments by post
export async function getCommentsByPost(req, res, next) {
    const { id: postId } = req.params;

    try {
        const comments = await prisma.comment.findMany({
            where: { postId: Number(postId) },
            include: {
                author: true,
                post: true,
                likes: true
            }
        });

        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}
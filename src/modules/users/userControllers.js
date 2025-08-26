import prisma from "../../config/prisma.js";

const response = (success, data, message, error) => {
    return {
        success,
        data,
        message,
        error
    };
}
// Create a user
export async function createUser (req, res, next) {
    const { name, username, email, password, bio, avatarImage } = req.body

    try {
        const user = await prisma.user.create({
        data: {name, username, email, password, bio, avatarImage}
    })
    res.status(201).json(user) 
    } catch (error) {
        next(error)
    }
}

// Get all users
export async function getAllUsers(req, res, next) {

    try {
        const users = await prisma.user.findMany({
            include: {
                posts: true,
                comments: true,
                likes: true,
                followers: true,
                following: true,
                savedPosts: true
            }
    })
        if (users.length === 0) return next({ status: 404, message: "No users found", code: "NOT_FOUND" })

        res.status(200).json(response(true, users, "Users fetched successfully", null));

    } catch (error) {
        next(error) 
    }
}

// Get a User by ID
export async function getUserById(req, res, next) {
    const { id } = req.params

    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            include: {
                posts: true,
                comments: true,
                likes: true,
                followers: true,
                following: true,
                savedPosts: true
            }
        })

         if (!user) {
      return next({ status: 404, message: "User not found", code: "NOT_FOUND" });
    }

        res.status(200).json(response(true, user, "User fetched successfully", null))
    } catch (error) {
        next(error)
    }
}

// Edit a User
export async function editUser(req, res, next) {
    const { id } = req.params;
    const { name, username, email, password, bio, avatarImage } = req.body;

    try {
    
        const existingUser = await prisma.user.findUnique({
            where: { id: Number(id) }
        });




        const dataToUpdate = {};
        const fields = { name, username, email, password, bio, avatarImage };

        for (const key in fields) {
            if (fields[key] !== undefined && fields[key] !== existingUser[key]) {
                dataToUpdate[key] = fields[key];
            }
        }

        if (Object.keys(dataToUpdate).length === 0) {
            return res.status(200).json(response(true, {}, "No fields were updated", null));
            
        }   

        // update the user
        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: dataToUpdate
        });

        const updatedFieldsNames = Object.keys(dataToUpdate).join(", ");

        res.status(200).json(response(true, updatedUser, `User updated successfully: ${updatedFieldsNames}`, null));

    } catch (error) {
        next(error);
    }
}

// Delete a User
export async function deleteUser(req, res, next) {
    const {id } = req.params
    try {

     const deletedUser = await prisma.user.delete({
        where: { id: Number(id)}
     })   

     res.status(200).json(response(true, deletedUser, `User ${deletedUser.username} deleted`, null))
    
        
    } catch (error) {
        next(error)
    }
}
import { prisma } from "../config/prisma.js";


async function createGenericUser(username, email, hashedPassword) {
    const user = await prisma.blogUser.create({
        data: {
            name: username,
            email: email.toLowerCase(),
            password: hashedPassword
        },
        select: {
            id: true,
            email: true
        }
    })
    return user;
}

async function createUserWithRole(username, email, hashedPassword, role) {
    const user = await prisma.blogUser.create({
        data: {
            name: username,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: role.toUpperCase()
        },
        select: {
            id: true,
            email: true
        }
    })
    return user;
}

async function retrieveUserByEmail(email) {
    const user = await prisma.blogUser.findFirst({ 
        where: {
            email: email.toLowerCase()
        }
    })
    return user;
}

async function retrieveUserById(id) {
    const user = await prisma.blogUser.findUnique({ 
        where: {
            id: id
        }
    })
    return user;
}

async function retrieveUserByToken(refreshToken) {
    const user = await prisma.blogUser.findFirst({ 
        where: {
            token: refreshToken
        }
    })
    return user;
}

async function updateRefreshToken(id,token) {
    const user = await prisma.blogUser.update({ 
        where: {
            id: id
        },
        data: {
            token: token
        }
    })
    return user;
}


export { 
    createGenericUser,createUserWithRole,retrieveUserByEmail,
    retrieveUserById,retrieveUserByToken,updateRefreshToken 
}


import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearAllUsers() {
    const del = await prisma.user.deleteMany({})
}

async function createUser(username, email, hashedPassword) {
    const user = await prisma.user.create({
        data: {
            name: username,
            email: email.toLowerCase(),
            password: hashedPassword,
        },
        select: {
            id: true,
            email: true
        }
    })
    return user;
}

async function retrieveUserByEmail(email) {
    const user = await prisma.user.findFirstOrThrow({ 
        where: {
            email: email.toLowerCase()
        }
    })
    return user;
}

async function retrieveUserById(id) {
    const user = await prisma.user.findUnique({ 
        where: {
            id: id
        }
    })
    return user;
}


export { clearAllUsers,createUser,retrieveUserByEmail,retrieveUserById }
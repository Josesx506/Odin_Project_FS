import { prisma } from "../config/prisma.js";
import { PrismaCustomError } from "../utils.js";


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

async function getAllPosts() {
    const posts = await prisma.blogPost.findMany({
        include: {
            comments: true,
        }
    });
    return posts;
}

async function getPostsByAuthorId(id) {
    const posts = await prisma.blogPost.findMany({
        where: {
            authorId: id,
        },
        include: {
            comments: true,
        }
    })
    return posts;
}

async function createDBPost(authorId, title, body, published) {
    const post = await prisma.blogPost.create({
        data: {
            title: title,
            body: body,
            published: published,
            authorId: Number(authorId),
        }
    })
    return post
}

async function createDBComment(authorId, postId, body) {
    const validPost = await prisma.blogPost.findUnique({
        where: { id: Number(postId) }
    });

    if (!validPost) {
        throw new PrismaCustomError("Post not found","P2025");
    }

    const comment = await prisma.blogComment.create({
        data: {
            body: body,
            postId: Number(postId),
            authorId: Number(authorId),
        }
    })
    return comment
}

async function updatePost(authorId, postId, title, body, published) {
    // Check if post exists
    const validPost = await prisma.blogPost.findUnique({
        where: { id: Number(postId) }
    })
    if (!validPost) {
        throw new PrismaCustomError("Post not found","P2025");
    }
    // Check if user authored the post
    if (validPost.authorId !== Number(authorId)) {
        throw new PrismaCustomError("Insufficient permissions","P2018");
    }

    // Check if user authored the post
    const post = await prisma.blogPost.update({
        where: { 
            id: Number(postId),
            AND: { authorId: Number(authorId) },
        },
        data: {
            title: title,
            body: body,
            published: published,
        }
    })
    return post;
}

async function updateComment(authorId, postId, commentId, body) {
    // Check if comment exists
    const validComment = await prisma.blogComment.findUnique({
        where: {id: Number(commentId)}
    })

    if (!validComment) {
        throw new PrismaCustomError("Comment not found","P2025");
    }

    if (validComment.authorId !== Number(authorId)) {
        throw new PrismaCustomError("Insufficient permissions","P2018");
    }

    // Check if user authored the comment belonging to a unique post
    const comment = await prisma.blogComment.update({
        where: {
            id: Number(commentId),
            AND: { 
                postId: Number(postId),
                authorId: Number(authorId),
            }
        },
        data: {
            body: body,
        }
    })
    return comment;
}

async function deletePostById(id) {
    const post = await prisma.blogPost.delete({
        where: { id: Number(id) }
    })
    return post;
}

async function deleteOwnPost(authorId, postId) {
    // Check if post exists
    const validPost = await prisma.blogPost.findUnique({
        where: { id: Number(postId) }
    })
    if (!validPost) {
        throw new PrismaCustomError("Post not found","P2025");
    }
    // Check if user authored the post
    if (validPost.authorId !== Number(authorId)) {
        throw new PrismaCustomError("Insufficient permissions","P2018");
    }

    const post = await prisma.blogPost.delete({
        where: { id: Number(postId) }
    })
    return post;
}

async function deleteCommentById(commentId) {
    const comment = await prisma.blogComment.delete({
        where: {
            id: Number(commentId)
        }
    });
    return comment;
}

async function deleteOwnComment(authorId, commentId) {
    // Check if comment exists
    const validComment = await prisma.blogComment.findUnique({
        where: {id: Number(commentId)}
    })
    if (!validComment) {
        throw new PrismaCustomError("Comment not found","P2025");
    }

    if (validComment.authorId !== Number(authorId)) {
        throw new PrismaCustomError("Insufficient permissions","P2018");
    }

    // Check if user authored the comment
    const comment = await prisma.blogComment.delete({
        where: { id: Number(commentId) }
    });
    return comment;
}

export {
    createDBComment, createGenericUser, createDBPost, createUserWithRole, deleteCommentById, 
    deleteOwnComment, deleteOwnPost, deletePostById, getAllPosts, getPostsByAuthorId, 
    retrieveUserByEmail, retrieveUserById, retrieveUserByToken, updateComment, updatePost, 
    updateRefreshToken
};


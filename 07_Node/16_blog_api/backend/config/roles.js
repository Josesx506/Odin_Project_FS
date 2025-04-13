
const ROLES = {
    ADMIN: [
        "view:posts",
        "create:posts",
        "update:ownPost",
        "delete:posts",
        "view:comments",
        "create:comments",
        "update:ownComment",
        "delete:comments",
    ],
    AUTHOR: [
        "view:ownPosts",
        "create:posts",
        "update:ownPost",
        "delete:ownPost",
        "view:comments",
        "create:comments",
        "update:ownComment"
    ],
    USER: [
        "view:posts",
        "view:comments",
        "create:comments",
        "update:ownComment"
    ]
}


export { ROLES };
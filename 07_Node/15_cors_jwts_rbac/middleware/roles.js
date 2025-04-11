
const ROLES = {
    ADMIN: [
        "view:messages",
        "create:messages",
        "update:message",
        "delete:messages",
    ],
    USER: [
        "view:messages",
        "create:messages",
        "update:ownMessage",
        "delete:ownMessage"
    ],
    GUEST: [
        "view:messages",
    ]
}


export { ROLES };
// mimic db models 

const links = [
    { href: '/', text: 'Home' },
    { href: 'about', text: 'About' },
    { href: 'articles', text: 'Articles' },
];

const users = ['Rose', 'Cake', 'Biff'];

const posts = [
    {title: 'Title 1', body: 'Body 1' },
    {title: 'Title 2', body: 'Body 2' },
    {title: 'Title 3', body: 'Body 3' },
    {title: 'Title 4', body: 'Body 4' },
]

const user = {
    firstName: 'John',
    lastName: 'Doe',
}

module.exports = { links, user, users, posts }
### Blog Backend API server
Generates a series of blog posts and random users that the frontend can use if the db is empty. There's a reset prisma 
bash script that seed the db only when it is empty.


### Packages
npm install express jsonwebtoken passport passport-local passport-jwt prisma @prisma/client bcryptjs dotenv cors cookie-parser
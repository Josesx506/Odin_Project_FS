### Prisma intro
Tutorial project for installing and completing exercises with prisma
1. Install prisma in new node environment - `npm install prisma --save-dev`
2. Launch prisma cli - `npx prisma`
    - creates a new directory called `prisma` that contains a file called schema.prisma, which contains 
        the Prisma schema with your database connection variable and schema models
    - creates the `.env` file in the root directory of the project, which is used for defining environment 
        variables (such as your database connection)
3. If you already have an existing database you want to integrate with Prisma, run `npx prisma db pull` to 
    turn your database schema into a Prisma schema.
4. Install prisma client with `npm install @prisma/client`
4. Define you schema in the `prisma/schema.prisma` file and run `npx prisma generate` to generate a Prisma 
    Client (UI)

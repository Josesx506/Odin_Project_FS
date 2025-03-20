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
4. Install prisma client with `npm install @prisma/client`. Installing the `@prisma/client` package 
    invokes the prisma generate command, which reads your Prisma schema and generates Prisma Client code.
5. Define you schema in the `prisma/schema.prisma` file and run `npx prisma generate` to regenerate any 
    changes to the Prisma Client schemas.
6. Migrate the db to create the tables if they don't exist yet - `npx prisma migrate dev`
7. View tables and relationships in the browser GUI by running `npx prisma studio`, and access the server 
    at http://localhost:5555.

### CRUD operations
Prisma is optimized for CRUD operationd and can be combined with fakerJS to bulk insert multiple dummy 
profiles into portfolio projects. Check out their website for query 
[examples](https://www.prisma.io/docs/orm/prisma-client/queries/crud).


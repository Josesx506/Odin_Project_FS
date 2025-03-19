### ORMs
Object Relational Mappers (ORM's) are libraries used to simplify db queries in programming languages. 
They assist in reducing a lot of the boilerplate code and convert repeated queries into simple 
object-oriented data structures. They're also useful for mitigating XSS attacks because they convert 
input characters to SQL which can help escape some harmful characters. When used in the context of 
no-sql databases, they're also referred to as Object Document Mappers (ODM's) for like MongoDb. <br>

In python, a popular ORM is sqlalchemy, and in JS, we use [Prisma ORM](https://www.prisma.io/orm). When 
all database interactions are done in raw SQL, there’s nowhere in the codebase where you can understand 
the database tables, their relations, and column data types. You might have to log in to your database to 
make sense of what the codebase is doing. To attain a technical understanding of the project, you now 
rely on the codebase as well as access to the database. <br>

Most ORMs out there solve this problem by bringing database definitions into the codebase. This is called 
a “schema”. This allows you to quickly glance at the schema of a table and understand what columns it has 
and so forth. When changes to the schema happen, e.g. a column name is changed or a new column is added, 
updating the db in raw sql can be complex and changes have to be tracked manually. This is called a 
"migration". ORMs standardize migrations via changelogs, and have processes to deal with conflicts. <br>

### Schema
The Prisma schema is a file where you will define your models. For example, consider a message table in a 
chat app:
```JS
model Message {
   id        Int      @id @default(autoincrement())
   content   String   @db.VarChar(255) 
   createdAt DateTime @default(now())
   author    User     @relation(fields: [authorId], references: [id])
   authorId  Int     
}

model User {
   // user's fields
}
```

### Prisma Client
The client is a separate library that you will use to interact with your database. The Prisma client is a 
bit special in that it’s customized to your schema.
```JS
// instantiate the client
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// when creating a new message
await prisma.message.create({
   data: {
      content: 'Hello, world!',
      authorId: 1
   }
})

// when fetching all messages
const messages = await prisma.message.findMany();
```
Notice the `prisma.message` object? How did Prisma Client know that there’s a `message` model? Once you 
create or update the schema file, all you have to do is run
```JS
npx prisma generate
```
in the CLI, and Prisma ORM will generate the client for you. The client can handle all sorts of querying: 
joins, filters, sorting, pagination, and more. Prisma Client also supports you writing raw SQL too.

### Prisma Migrate
Prisma migrate is a tool that helps you perform database migrations. When you decide to change the schema 
in any way, you run a Prisma migration to apply the schema changes to the database. These changes are 
tracked in a `migrations` folder in your codebase.
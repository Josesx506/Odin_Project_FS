### ORMs
Object Relational Mappers (ORM's) are libraries used to simplify db queries in programming languages. 
They assist in reducing a lot of the boilerplate code and convert repeated queries into simple 
object-oriented data structures. They're also useful for mitigating XSS attacks because they convert 
input characters to SQL which can help escape some harmful characters. When used in the context of 
no-sql databases, they're also referred to as Object Document Mappers (ODM's) for like MongoDb. Currently, 
prisma provides support for mysql, postgresql, mongodb, and others. <br>

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
The Prisma schema is a file where you will define your models. You can define tables, specify foreign 
keys, and even  index columns easily using prisma schemas. For example, consider a message table in a 
chat app:
```prisma
model Message {
   id        Int      @id @default(autoincrement())   // Primary key
   content   String   @db.VarChar(255) 
   createdAt DateTime @default(now())                 // Specifying default values
   published Boolean  @default(false)                 // Specifying default values
   author    User     @relation(fields: [authorId], references: [id]) // Relation field, doesn't exist in db
   authorId  Int                                      // Foreign key

   @@index(authorId)  // Index column for efficient search
}

model User {
   // user's fields
   email      String     @unique                 // Unique keys
   createdAt  DateTime   @default(now())         // default key values
}
```
You can define indexes on one or multiple fields of your models via the `@@index` on a model. e.g. 
`@@index([title, content])`. <br>

In Relational databases, **required** fields are represented via `NOT NULL` constraints in the underlying 
database. Required fields are not a concept on a MongoDB database level. Unsupported data types are added 
as *Unsupported* e.g `location    Unsupported("POLYGON")?`. Fields of type Unsupported do not appear in 
the generated Prisma Client API, but you can still use Prisma ORM’s raw database access feature to query 
these fields. <br>

Multiple columns can also be specified as identifiers e.g. using First Name and Last Name columns to 
identify a user. By default, the name of this field in Prisma Client queries will be 
`firstName_lastName`. You can also provide your own name for the ***composite ID*** using the `@@id` 
attribute's name field: `@@id(name: "fullName", fields: [firstName, lastName])`, which will rename the 
column name to `fullName`. <br>

Default values can be 
- Static values that correspond to the field type, such as 5 (Int), Hello (String), or false (Boolean).
- Lists of static values, such as [5, 6, 8] (Int[]) or ["Hello", "Goodbye"] (String[]). 
- Functions, such as `now()` or `uuid()`
- JSON data. Note that JSON needs to be enclosed with double-quotes inside the `@default` attribute, 
    e.g.: `@default("[]")`, and then escape any internal double quotes using a backslash, e.g.: 
    `@default("{ \"hello\": \"world\" }")`.

Prisma ORM currently only supports models that have at least one unique field or combination of fields. 
In practice, this means that every Prisma model must have either at least one of the following attributes:
- `@id` or `@@id` for a single- or multi-field primary key constraint (max one per model)
- `@unique` or `@@unique` for a single- or multi-field unique constraint

### Defining IDs in MongoDB
The MongoDB connector has specific rules for defining an ID field that differs from relational databases. 
An ID must be defined by a single field using the `@id` attribute and must include `@map("_id")`. <br>

In the following example, the User ID is represented by the id string field that accepts an auto-generated `ObjectId`:
```prisma
model User {
  id      String   @id @default(auto()) @map("_id") @db.ObjectId
  email   String   @unique
  name    String?
  role    Role     @default(USER)
  posts   Post[]
  profile Profile?
}
```

### Relations between tables
A relation is a connection between two models in the Prisma schema. Relation fields are fields on a 
Prisma model that do not have a scalar type. Instead, their type is another model. Relation fields are  only required on ***one side of the relation*** (with the corresponding relation scalar field / foreign 
key). Different kinds of relationships can exist in Prisma schemas, one-to-one, one-to-many, and 
many-to-many. This is usually for SQL tables and NoSQL tables follow a different syntax in prisma.
- **one-to-one** relationship
    ```prisma
    model User {
        id      Int      @id @default(autoincrement())
        profile Profile?                                          // Foreign key link
    }

    model Profile {
        id     Int  @id @default(autoincrement())
        user   User @relation(fields: [userId], references: [id]) // relation field for User
        userId Int  @unique                                       // Foreign key
    }
    ```
    Can be queried as `prisma.user.findMany({include: {profile: true}})`. This will return an object 
    with keys indicating the single user, and associated profile. To make the relationship **optional** 
    for deletion purposes, you can include a question mark `user   User?  @relation(...)` during 
    definition.
- **one-to-many** relationships. Used when two tables can share a unique key between them
    ```prisma
    model User {
        id      Int      @id @default(autoincrement())
        posts   Post[]
    }

    model Post {
        id         Int        @id @default(autoincrement())
        author     User       @relation(fields: [authorId], references: [id]) // relation field for User
        authorId   Int        // Foreign key
    }
    ```
    A user can have many posts and notice the square brackets in `posts   Post[]`, which indicates a 
    one-to-many relationship. Can be queried as `prisma.user.findMany({include: {posts: true}})`. This 
    time, the `posts` key in the returned object will include an **array** of post objects, indicating 
    that a single user can have multiple posts.
- **many-to-many** relationships. This is typical when the same values can exists across multiple 
    objects e.g. posts and categories.
    ```prisma
    model Post {
        id         Int        @id @default(autoincrement())
        categories Category[]
    }

    model Category {
        id         Int       @id @default(autoincrement())
        posts Post[]
    }
    ```
    This can be implicit (example above) or explicit. In implicit many-to-many relationships, prisma 
    generates any intermediate tables required to define the relationships. In explicit many-to-many 
    relationships, the intermediate tables are manually generated to improve control. 
    ```prisma
    model Post {
        id         Int        @id @default(autoincrement())
        tags       PostTag[]
    }

    model Tag {
        id         Int        @id @default(autoincrement())
        posts      PostTag[]
    }

    model PostTag {
        postId Int
        post   Post @relation(fields: [postId], references: [id])

        tagId  Int
        tag    Tag  @relation(fields: [tagId], references: [id])

        @@id([postId, tagId])
    }
    ```
    Implicit many-to-many relationships trade-off ease of use for customizability.

    Can be queried as `prisma.post.findMany({include: {categories: true}})`. Returns a list of objects 
    with nested list of objects where appropriate.


> [!Important]
> Relation fields define connections between models at the Prisma ORM level and ***do not exist in the database***. 
    These fields are used to generate Prisma Client. The scalar fields below e.g. authorId are the 
    actual ***foreign keys***. They can also be assigned names when multiple relationship fields are 
    used across the same set of 2 models to reduce ambiguity e.g. `@relation("WrittenPosts")` and 
    `@relation("PinnedPost")` can be used in the same table _User_ table to distinguish unique  
    relationships.


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
joins, filters, sorting, pagination, and more. Prisma Client also supports you writing raw SQL too. <br>

To access atable, use `prisma.<tableName>.<operation>` where the operation can be `create()`,`find()`, 
`findMany()`,`update()`, etc. Each operation allows us to perform CRUD operations asynchronously on the db 
using object oriented syntax.

### Prisma Migrate
Prisma migrate is a tool that helps you perform database migrations. When you decide to change the schema 
in any way, you run a Prisma migration to apply the schema changes to the database. These changes are 
tracked in a `migrations` folder in your codebase.
```bash
npx prisma migrate dev --name init                  # Initial migration
npx prisma migrate dev --name add-status-column     # Subsequent migration
```


### Prisma Studio GUI
To view db tables in the prisma studio gui, run `npx prisma studio` in terminal. This starts a local 
server at http://localhost:5555, where you can view table relationships interactively in your browser. <br>

Prisma ORM likely is a good fit for you if
- you are building a server-side application that talks to a database
- you care about productivity and developer experience
- you are working in a team
- you want a tool that holistically covers your database workflows
- you value type-safety
- you want to write raw, type-safe SQL

You can also download the Prisma VSCode extension [here](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma).
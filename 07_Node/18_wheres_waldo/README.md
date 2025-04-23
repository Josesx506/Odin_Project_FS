### Introduction
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). <br>

Where's Waldo involves identifying small objects amidst many other objects using the mouse. Similar to photo tagging, each click 
has a bounding box with a dropdown to select which character you believe exists at those coordinates. The logic of the game is 
to determine whether your logic is correct, and how fast it took you to find all the characters. <br>

### Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

### Database
I wanted to use MongoDB for this project because it felt easier to implement onbjects like bounding boxes in a NoSQL db vs. a 
relational db. I also wanted to get working experience with the mongoose ODM instead of prisma for learning purposes. In the 
DATABASE_URL,
```bash
DATABASE_URL=mongodb+srv://<username>:<password>@<clusterName>.vutxdmd.mongodb.net/<DATABASENAME>?retryWrites=true&w=majority&appName=ClusterOdin
```
The _DATABASENAME_ is missing by default, and I had to manually insert it after creating a database on mongo atlas. The collection / 
table name can also be created in mongo. 


### Mongoose Issues
Connecting to mongoose with the latest version was giving my IP whitelist errors and the temptation to use prisma was high but I stuck 
through it and found this [article](https://medium.com/@ayiaware/resolving-mongodb-connection-issues-beyond-ip-whitelisting-f4c132c2a9a8).
Installing `mongoose@8.3.4` resolved the whitelist issues for me.
- Get ip address from terminal `ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}'` or go to https://www.whatismyip.com/ and 
    check your ip address.

>[!Important]
> When you add your ip address, mongo includes a `/32` behind it which prevents it from working e.g. `216.201.252.184/32`, replace the 32 
    with **`0`** to make it work `216.201.252.184/0`

### Prisma
After multiple failed attempts with Mongoose (24h limit), I decided to revert to prisma especially since mongoose does not update the db 
and requires me to create them manually first. To set up prisma with mongo
- Run `npx prisma init` to create the schema file
- Populate the schema config and add a simple schema  
    ```prisma
    datasource db {
    provider     = "mongodb"
    url          = env("DATABASE_URL")
    }

    model Images {
    id        String   @id @default(auto()) @map("_id") @db.ObjectId
    url       String
    width     Int
    height    Int
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    }
    ```
- Then run `npx prisma generate` and `npx prisma db push`. Mongodb collections cannot be migrated, and the migration command does not 
    work, hence the `db push` option.
- To use it in NextJS, create a `/src/lib/db.js` file. This is similar to the `/config/prisma.js` file in node express, and its used to 
    unify the prisma client import across the application
    ```JS
    import { PrismaClient } from "@prisma/client";

    const db = global.prisma || new PrismaClient();

    if (process.env.NODE_ENV !== "production") global.prisma = db;

    export default db
    ```
- Create a `/src/app/api` directory to work with server side apis in NextJS. For each route, create a folder with a `route.js` file. 
    You can define REST api requests like get,post,delete etc for each route and access the db on the server side
- Update your `package.json` scripts to include a postinstall
    ```json
    "scripts": {
        "dev": "next dev --turbopack",
        "build": "next build",
        "start": "next start",
        "lint": "next lint",
        "postinstall": "prisma generate"
    },
    ```
- After all the prisma setup, it didn't work with the mongo db free tier because prisma uses transactions for mongodb insertions and transactions 
    are not available on the free tier, so I reverted to Mongoose.
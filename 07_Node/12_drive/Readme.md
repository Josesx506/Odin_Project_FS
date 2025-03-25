### Media Drive
This project required creating a file storage system that's similar to Google drive. Storage options were 
- [AWS S3](https://aws.amazon.com/s3/)
- [Cloudinary](https://cloudinary.com/) (Odin Recommendation)
- [Supabase Storage](https://supabase.com/docs/guides/storage) (Odin Recommendation)

I opted for Cloudinary since it was the easiest to setup and connect with my express app but it doesn't 
serve pdf and zip files except you change personal settings to be responsible for user uploaded malware, 
hence I restricted the app to only allow images and videos only, which influenced me naming it 
***Media Drive***.

> [!Note]
> For simplicity, only files are uploaded to cloudinary. The folder/file system structure is persisted 
    on the db and would restart if I restart my railway db instance.

### File Systems
The file system has to be handled as a tree where each entry has an `owner`, `parentId`, and an array of 
`children`. NoSQL dbs are better suited to handle this structure but I implemented it in postgres using 
tips from the article below.

>[!Tip]
> Dealing with hierarchical trees in Postgres [link](https://leonardqmarcq.com/posts/modeling-hierarchical-tree-data).

Using appropriate row relationships allow us to recursively retrieve filepaths and associated children 
for a specific user using PostgreSQL's `WITH RECURSIVE` CTEs through `prisma.$queryRaw`. 

### Project Dependencies
```JS
npm install bcryptjs connect-flash dotenv ejs express express-session express-validator passport passport-local prisma @prisma/client @quixo3/prisma-session-store
```

### Sharing files
Check `access_control` in https://cloudinary.com/documentation/image_upload_api_reference for restricting 
link access by time

> [!Important]
> zip and pdf files are not served by default on cloudinary - visit [here](https://console.cloudinary.com/settings/c-825e97b0a11f6c2158044292115ae8/security) to manually change it.
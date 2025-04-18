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

Using appropriate row relationships allowed me to recursively retrieve filepaths and associated children 
for a specific user using PostgreSQL's `WITH RECURSIVE` Common Table Expression (CTEs) through 
`prisma.$queryRaw`. 

### Project Dependencies
```JS
npm install bcryptjs crypto connect-flash dotenv ejs express express-session express-validator passport passport-local prisma @prisma/client @quixo3/prisma-session-store
```

### Sharing files
Sharing files was a slightly complicated process. I used cloudinary to create a private download url, and 
created a *random hash* id download id. The duration of the link is shared in the body of the request 
using radio button options from a modal pop-up form. The Expiry table was created in postgres using prisma 

| id | downloadId | privateUrl | expiresAt |
| :--- | :----: | :----: | :---- |
| 1 | 580d41344238e96d | https://api.cloudinary.com/... | 1743132214 |

The `downloadId` was used to create a custom link
```JS
const downloadId = crypto.randomBytes(16).toString('hex');
const sharedLink = `${req.protocol}://${req.get('host')}/public-media/${downloadId}`;
```
that can be accessed from the `/public-media/:downloadId` route. On the server side, I first retrieve 
the entry that matches the downloadId from the db. Then I check whether the route is valid or throw an 
expired link error. For valid links, I redirect the response to access the image via the signed 
cloudinary link. <br>

Protected routes were restricted using passportJS localStrategy, and the middleware redirects signed out 
users to the sign in page.

> [!Caution] 
> The signed cloudinary link exposes my api key because the private url is not hosted on a cdn. I didn't 
    want to use a new hosting service just to resolve this issue so I didn't change it. 

Check `access_control` in https://cloudinary.com/documentation/image_upload_api_reference for restricting 
link access by time. The cloudinary link also has an expiry date.

> [!Important]
> zip and pdf files are not served by default on cloudinary - visit [here](https://console.cloudinary.com/settings/c-825e97b0a11f6c2158044292115ae8/security) to manually change it.

### Design
I designed the styles and apps for all the main routes myself using vanilla html and css with styles 
inspired from google search and youtube videos. The landing page was designed with v0 cause I was 
tired after implementing all the other functionality. This was definitely harder than the members only 
project but I loved the final result. <br>
I also created the home icon as a custom svg and I'm happy with the design.

### Tips
This required a good understanding of recursion, hashmaps and postgres to implement. A lot of the 
functions were executed directly in sql because doing them in JS would be slow as seen from other Odin 
project submissions. For forms, disable the submit button while the requests are processing to prevent 
multiple requests that can crash the app.

### Deployment
The app environment variables requires the following keys
```bash
DATABASE_URL=
SESS_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=
BASIC_STORAGE=
```
The production repo of the app was connecting to a postgres db that I've been using for all my other Odin 
projects and migrating it with prisma would have deleted all my non-prisma tables. To fix it, I had to 
[baseline](https://www.prisma.io/docs/orm/prisma-migrate/workflows/baselining) the db or find a way to 
run terminal commands in the docker environment that launches my app. I chose a workaround by creating a 
baseline bash script called `resetPrisma.sh`
```bash
rm -rf prisma/migrations/
mkdir -p prisma/migrations/0_init
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
apt update && apt install -y postgresql-client
psql $DATABASE_URL -f prisma/migrations/0_init/migration.sql
npx prisma migrate resolve --applied 0_init
```
Then I updated my `package.json` start command to use 
```JSON
{
  "start": "bash ./resetPrisma.sh && prisma migrate deploy && node index.js",
}
```
This allowed me to baseline my db without deleting prior tables with prisma. I don't know if it'll work 
for future odin projects that use prisma and for how long I can keep using the same railway db instance, 
but I'll keep pushing till the wheels fall off 🤞🏽.

### Retrospect
I had a poor experience using the Cloudinary api, in retrospect, I should have used supabase. Deleting 
items are very complex on cloudinary and images and videos have to be deleted using separate api calls 
because the `resourceType` argument is different, and if you don't use the correct resourceType, the 
request will fail. I'll also run out of storage on my free tier if I don't clear user data from the 
remote storage. This is only used when deleting multiple files that exist as embedded children within a 
folder. Uploading files too is slightly complex but multer helped to handle some of the errors with form 
validation for uploads. <br>
The `Expiry` table which is used to handle shared links can easily rack up entries. In a real world 
scenario, it'll be helpful to run a `pg_cron` job that removes all expired entries from the table to 
avoid errors.


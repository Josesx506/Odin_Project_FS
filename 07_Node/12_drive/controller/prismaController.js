const prisma = require('../config/prismaClient');


async function getAllChildrenRecursive(userId,itemId) {
  // This uses PostgreSQL's WITH RECURSIVE feature
  const result = await prisma.$queryRaw`
    WITH RECURSIVE tree AS (
      SELECT * FROM "DriveItem" WHERE id = ${itemId} AND "ownerId" = ${userId}
      UNION ALL
      SELECT i.* FROM "DriveItem" i
      INNER JOIN tree t ON i."parentId" = t.id
    )
    SELECT * FROM tree ORDER BY name;
  `;
  
  return result;
}

async function getUserRootDescendants(userId) {
  const result = await prisma.$queryRaw`
    WITH RECURSIVE tree AS (
      SELECT * FROM "DriveItem" WHERE "ownerId" = ${userId} AND type = 'FOLDER'
      UNION ALL
      SELECT i.* FROM "DriveItem" i
      INNER JOIN tree t ON i."parentId" = t.id
    )
    SELECT * FROM tree ORDER BY "createdAt","type","name";
  `;
  
  return result;
}

async function getFolderContents(userId, folderId) {
  return prisma.driveItem.findMany({
    where: {
      parentId: folderId,
      ownerId: userId
    },
    orderBy: [
      // Folders first, then files
      { type: 'asc' },
      { name: 'asc' }
    ]
  });
}

async function findRootDir(userId) {
  const rows = prisma.driveItem.findFirst({
    where: {
      ownerId: userId,
      name: "root"
    }
  })
  return rows;
}

async function createFolder(name, parentId, userId) {
  await prisma.driveItem.create({
    data: {
      name: name,
      type: 'FOLDER',
      ownerId: userId,
      parentId: parentId
    }
  });
}

async function uploadFile(userId, parentId, fileName, url, fileExt, fileSize) {
  await prisma.driveItem.create({
    data: {
      name: fileName,
      type: 'FILE',
      url: url,
      mimeType: fileExt,
      size: fileSize,
      ownerId: userId,
      parentId: parentId
    }
  });
}


module.exports = { 
    findRootDir, createFolder, uploadFile,
    getAllChildrenRecursive, getFolderContents,
    getUserRootDescendants
}
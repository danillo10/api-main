const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const urlConfig = require("../../config/url");

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "..", "public", "media"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        file.key = `${hash.toString("hex")}-${file.originalname}`;
        file.location = `${urlConfig.urlApi}/public/media/${file.key}`;
        cb(null, file.key);
      });
    },
  }),
};

const imageUpload = {
  dest: path.resolve(__dirname, "..", "..", "..", "public", "media"),
  storage: storageTypes.local,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato de arquivo inválido"), false);
    }
  },
};

const upload = (field) => multer(imageUpload).single(field);

module.exports = { upload };

// const multer = require('multer')
// const multerS3 = require('multer-s3')
// const aws = require('aws-sdk')
// const path = require('path')
// const crypto = require('crypto')
// const storageConfig = require('../../config/storage')
// const urlConfig = require('../../config/url')

// const storageS3 = new aws.S3({
//   accessKeyId: storageConfig.awsAccessKeyId,
//   secretAccessKey: storageConfig.awsSecretAccessKey,
//   region: storageConfig.awsDefaultRegion
// })

// const storageTypes = {
//   local: multer.diskStorage({
//     destination: (req, res, cb) => {
//       cb(null, path.resolve(__dirname, '..', '..', '..', 'public', 'media'))
//     },
//     filename: (req, file, cb) => {
//       crypto.randomBytes(16, (err, hash) => {
//         if (err) cb(err)
//         file.key = `${hash.toString('hex')}-${file.originalname}`
//         file.location = `${urlConfig.urlApi}/public/media/${file.key}`
//         cb(null, file.key)
//       })
//     }
//   }),
//   s3: multerS3({
//     s3: storageS3,
//     bucket: storageConfig.awsBucketName,
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     acl: 'public-read',
//     key: (req, file, cb) => {
//       crypto.randomBytes(16, (err, hash) => {
//         if (err) cb(err)
//         const fileName = `${hash.toString('hex')}-${file.originalname}`
//         cb(null, fileName)
//       })
//     }
//   })
// }

// const imageUpload = {
//   dest: path.resolve(__dirname, '..', '..', '..', 'public', 'media'),
//   storage: storageTypes[storageConfig.storageType],
//   limits: {
//     fileSize: 2 * 1024 * 1024
//   },
//   fileFilter: (req, file, cb) => {
//     const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
//     if (allowedMimes.includes(file.mimetype)) {
//       cb(null, true)
//     } else {
//       cb(new Error('Formato de arquivo inválido'), false)
//     }
//   }
// }

// const upload = field => multer(imageUpload).single(field)

// module.exports = { upload }

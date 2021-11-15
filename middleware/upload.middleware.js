const multer = require("multer");
const multerS3 = require("multer-s3");
const s3Bucket = require("../utils-server/aws");

const onboardingUpload = multer({
  storage: multerS3({
    s3: s3Bucket,
    bucket: "docbookproject",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  }),
});

module.exports = onboardingUpload.fields([
  { name: "image", maxCount: 1 },
  { name: "document", maxCount: 1 },
]);

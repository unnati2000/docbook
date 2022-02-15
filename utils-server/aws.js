const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_ID,
  region: process.env.AWS_BUCKET_REGION,
});

const s3Bucket = new AWS.S3({
  params: { Bucket: process.env.AWS_BUCKET_NAME },
});



module.exports = s3Bucket;

const s3Bucket = require("../utils-server/aws");
const getImageBuffer = require("../utils-server/buffer");

const imageUpload = (path, buffer) => {
  const data = {
    Key: path,
    Body: Buffer,
    ContentEncoding: contentEncoding,
    ContentType: contentType,
    ACL: acl,
  };

  return new Promise((resolve, reject) => {
    s3Bucket.putObject(data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`${process.env.AWS_UPLOAD_URL}` + path);
      }
    });
  });
};

const getImageURL = async (type, base64Image) => {
  const buffer = getImageBuffer(base64Image);
  const currentTime = new Date().getTime();

  return imageUpload(`${type}/${currentTime}.jpeg`, buffer);
};

module.exports = getImageURL;

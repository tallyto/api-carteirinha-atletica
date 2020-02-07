const aws = require('aws-sdk');

const s3 = new aws.S3(
  {
    accessKeyId: 'AKIAVHKUOQJ4HN6ZZNPV',
    secretAccessKey: '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',
    region: 'sa-east-1',
  },
);

module.exports = function removeImageS3(key) {
  s3.deleteObject({
    Bucket: 'carteirinha-atletica',
    Key: key,
  }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

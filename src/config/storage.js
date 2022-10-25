const {
  NODE_STORAGE_TYPE,
  AWS_BUCKET_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_DEFAULT_REGION
} = process.env

const storageConfig = {
  storageType: NODE_STORAGE_TYPE,
  awsBucketName: AWS_BUCKET_NAME,
  awsAccessKeyId: AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: AWS_SECRET_ACCESS_KEY,
  awsDefaultRegion: AWS_DEFAULT_REGION
}

module.exports = storageConfig

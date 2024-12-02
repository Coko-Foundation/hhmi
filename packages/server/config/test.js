module.exports = {
  useFileStorage: true,
  fileStorage: {
    accessKeyId: 'S3_ACCESS_KEY_ID',
    secretAccessKey: 'S3_SECRET_ACCESS_KEY',
    url: 'S3_URL',
    bucket: 'S3_BUCKET',
    // protocol: 'S3_PROTOCOL',
    // host: 'S3_HOST',
    // port: 'S3_PORT',
    minioConsolePort: 'MINIO_CONSOLE_PORT',
    maximumWidthForSmallImages: 'MAXIMUM_WIDTH_FOR_SMALL_IMAGES',
    maximumWidthForMediumImages: 'MAXIMUM_WIDTH_FOR_MEDIUM_IMAGES',
  },
}

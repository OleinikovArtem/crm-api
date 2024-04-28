export const minioConfig = () => ({
  minio_port: Number(process.env.MINIO_PORT) || 9000,
  minio_endpoint: process.env.MINIO_ENDPOINT || 'minio',
  minio_access_key: process.env.MINIO_ACCESS_KEY || '',
  minio_secret_key: process.env.MINIO_SECRET_KEY || '',
  minio_bucket: process.env.MINIO_BUCKET || 'bucket',
});

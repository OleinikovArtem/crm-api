import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import { minioConfig } from 'src/config/minio.config';

const { minio_endpoint, minio_secret_key, minio_access_key } = minioConfig();

@Module({
  imports: [
    MinioModule.register({
      endPoint: minio_endpoint,
      port: 443,
      useSSL: true,
      accessKey: minio_access_key,
      secretKey: minio_secret_key,
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}

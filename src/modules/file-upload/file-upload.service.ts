import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/modules/minio-client/minio-client.service';
import { BufferedFile } from 'src/modules/minio-client/file.model';

@Injectable()
export class FileUploadService {
  constructor(
    private minioClientService: MinioClientService,
  ) {
  }

  async uploadSingle(file: BufferedFile) {
    try {
      const uploaded_file = await this.minioClientService.upload(file);
      let file_url = uploaded_file.url;

      if (process.env.NODE_ENV !== 'development') {
        file_url = 'http://localhost' + file_url.slice(5);
      }

      return {
        file_url,
        message: 'Successfully uploaded to MinIO S3',
      };
    } catch (error) {
      console.log(error);
      throw new error
    }
  }

  async uploadMultiple(images: BufferedFile[]) {
    return Promise.allSettled(
      images.map(image => this.uploadSingle(image)),
    );
  }
}

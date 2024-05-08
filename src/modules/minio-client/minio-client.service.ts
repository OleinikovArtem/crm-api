import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';

import { minioConfig } from 'src/config/minio.config';
import { BufferedFile } from './file.model';

import * as crypto from 'crypto';

const { minio_bucket, minio_port, minio_endpoint } = minioConfig();

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly baseBucket = minio_bucket || 'bucket';

  public get client() {
    return this.minio.client;
  }

  constructor(private readonly minio: MinioService) {
    this.logger = new Logger('MinioStorageService');
  }

  public async upload(
    file: BufferedFile,
    baseBucket: string = this.baseBucket,
  ) {
    try {
      if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
        throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
      }
      const temp_filename = Date.now().toString();
      const hashedFileName = crypto
        .createHash('md5')
        .update(temp_filename)
        .digest('hex');
      const ext = file.originalname.substring(
        file.originalname.lastIndexOf('.'),
        file.originalname.length,
      );
      const metaData = {
        'Content-Type': file.mimetype,
        // 'X-Amz-Meta-Testing': 1234,
      };
      const filename = hashedFileName + ext;
      const fileName: string = `${filename}`;
      const fileBuffer = file.buffer;

      await this.client.putObject(
        baseBucket,
        fileName,
        fileBuffer,
        undefined,
        metaData,
      );

      return {
        url: `${minio_endpoint}:${minio_port}/${minio_bucket}/${filename}`,
      };
    } catch (err) {
      console.error(err);
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(objetName: string, baseBucket: string = this.baseBucket) {
    try {
      await this.client.removeObjects(baseBucket, [objetName]);
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Oops Something wrong happend',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

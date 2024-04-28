import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UseGuards } from '@nestjs/common';
import { RoleGuard } from '@modules/auth/role.guard';
import { ROLE } from '.prisma/client';

import { FileUploadService } from './file-upload.service';

import { BufferedFile } from 'src/modules/minio-client/file.model';

@Controller('file-upload')
export class FileUploadController {
  constructor(
    private fileUploadService: FileUploadService,
  ) {
  }


  @UseGuards(RoleGuard([ROLE.ADMIN]))
  @Post('single')
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingle(
    @UploadedFile() image: BufferedFile,
  ) {
    return await this.fileUploadService.uploadSingle(image);
  }
}

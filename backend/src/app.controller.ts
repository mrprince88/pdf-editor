import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  servePdf(@Res() res: Response) {
    const pdfFilePath = this.appService.getPdf();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=example.pdf');

    return res.sendFile(pdfFilePath);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPdf(@UploadedFile() file: Express.Multer.File) {
    const buffer = Buffer.from(file.buffer);
    return this.appService.savePdf(buffer);
  }
}

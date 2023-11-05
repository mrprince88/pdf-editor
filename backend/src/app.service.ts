import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { writeFileSync } from 'fs';

@Injectable()
export class AppService {
  getPdf() {
    const pdfFilePath = path.join(__dirname, '../public/example.pdf');
    return pdfFilePath;
  }

  savePdf(buffer: Buffer) {
    const pdfFilePath = path.join(__dirname, '../public/example.pdf');
    return writeFileSync(pdfFilePath, buffer);
  }
}

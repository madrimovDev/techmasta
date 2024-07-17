import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { Request } from 'express';

export const multerConfig: MulterOptions = {
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      let uploadPath = './uploads';
      // Use dynamic import for file-type

      if (file.mimetype) {
        switch (file.mimetype as string) {
          case 'image/jpeg':
          case 'image/png':
          case 'image/gif':
            uploadPath = path.join(uploadPath, 'images');
            break;
          case 'video/mp4':
          case 'video/x-matroska':
          case 'video/quicktime':
            uploadPath = path.join(uploadPath, 'videos');
            break;
          case 'application/pdf':
            uploadPath = path.join(uploadPath, 'pdfs');
            break;
          case 'application/x-msdownload':
          case 'application/x-msi':
          case 'application/octet-stream': // This might cover exe and drivers
            uploadPath = path.join(uploadPath, 'applications');
            break;
          default:
            uploadPath = path.join(uploadPath, 'others');
            break;
        }
      } else {
        uploadPath = path.join(uploadPath, 'others');
      }

      // Ensure the directory exists
      fs.mkdirSync(uploadPath, { recursive: true });

      cb(null, uploadPath);
    },
    filename: (req: Request, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

      cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 150 * 1024 * 1024, // 100 MB file size limit
  },
};

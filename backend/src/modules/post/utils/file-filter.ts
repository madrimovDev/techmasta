import { BadRequestException } from '@nestjs/common';

export const fileFilter = (
  _,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  const allowedMimeTypes = {
    video: 'video/mp4',
    poster: 'image/jpeg',
  };

  const isFileTypeValid = allowedMimeTypes[file.fieldname] === file.mimetype;

  if (isFileTypeValid) {
    callback(null, true);
  } else {
    callback(
      new BadRequestException(`Invalid file type for ${file.fieldname}`),
      false,
    );
  }
};

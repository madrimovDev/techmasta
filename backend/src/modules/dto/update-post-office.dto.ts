import { PartialType } from '@nestjs/swagger';
import { CreatePostOfficeDto } from './create-post-office.dto';

export class UpdatePostOfficeDto extends PartialType(CreatePostOfficeDto) {}

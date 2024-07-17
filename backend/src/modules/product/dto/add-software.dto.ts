import { ApiProperty } from '@nestjs/swagger';

export class AddSoftwareDto {
  @ApiProperty({
    format: 'binary',
    type: 'string',
  })
  software: any;
}

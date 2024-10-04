import { Controller, Get, Query } from '@nestjs/common';
import { SoatoService } from './soato.service';
import { WrapperDecorator } from '../../common/decorators/wrapper.decorator';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Soato')
@Controller('soato')
export class SoatoController {
  constructor(private readonly soatoService: SoatoService) {}

  @WrapperDecorator({
    isPublic: true,
    summary: ['Get Soato'],
  })
  @ApiQuery({
    name: 'regionCode',
    type: 'string',
    required: false,
  })
  @Get()
  getAllSoatos(@Query('regionCode') regionCode?: string) {
    if (!regionCode) {
      return this.soatoService.findAllRegions();
    }
    return this.soatoService.findAllDistricts(regionCode);
  }
}

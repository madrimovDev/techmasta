import { Module } from '@nestjs/common';
import { SoatoService } from './soato.service';
import { SoatoController } from './soato.controller';

@Module({
  controllers: [SoatoController],
  providers: [SoatoService],
})
export class SoatoModule {}

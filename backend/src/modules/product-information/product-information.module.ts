import { Module } from '@nestjs/common';
import { ProductInformationService } from './product-information.service';
import { ProductInformationController } from './product-information.controller';

@Module({
  providers: [ProductInformationService],
  controllers: [ProductInformationController],
})
export class ProductInformationModule {}

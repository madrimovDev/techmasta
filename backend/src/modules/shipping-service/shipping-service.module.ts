import { Module } from '@nestjs/common';
import { ShippingServiceService } from './shipping-service.service';
import { ShippingServiceController } from './shipping-service.controller';

@Module({
  controllers: [ShippingServiceController],
  providers: [ShippingServiceService],
})
export class ShippingServiceModule {}

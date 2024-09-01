import { DeliveryStatus, PaymentStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOrderStatusDto {
  @ApiProperty({
    enum: PaymentStatus,
  })
  @IsOptional()
  @IsString()
  paymentStatus?: PaymentStatus;

  @ApiProperty({
    enum: DeliveryStatus,
  })
  @IsOptional()
  @IsString()
  deliveryStatus?: DeliveryStatus;
}

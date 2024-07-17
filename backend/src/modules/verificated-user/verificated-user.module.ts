import { Module } from '@nestjs/common';
import { VerificatedUserService } from './verificated-user.service';

@Module({
  providers: [VerificatedUserService],
  exports: [VerificatedUserService],
})
export class VerificatedUserModule {}

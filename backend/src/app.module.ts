import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import * as redisStore from 'cache-manager-ioredis';
import { AuthModule, JwtAuthGuard, RolesGuard } from './modules/auth';
import { PrismaModule } from './common';
import { UsersModule } from './modules/users';
import { VerificatedUserModule } from './modules/verificated-user';
import { FileUploadModule } from './common/multer';
import { CategoryModule } from './modules/category';
import { PostModule } from './modules/post';
import { ProductModule } from './modules/product';
import { ProductImageModule } from './modules/product-image';
import { ProductInformationModule } from './modules/product-information';
import { ShippingServiceModule } from './modules/shipping-service/shipping-service.module';
import { OrderModule } from './modules/order/order.module';
import { SoatoModule } from './modules/soato/soato.module';
import { DiscountModule } from './modules/discount/discount.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
      }),
    }),
    VerificatedUserModule,
    FileUploadModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    CategoryModule,
    PostModule,
    ProductModule,
    ProductImageModule,
    ProductInformationModule,
    ShippingServiceModule,
    OrderModule,
    SoatoModule,
    DiscountModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

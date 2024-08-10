import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import * as redisStore from 'cache-manager-ioredis';
import { AuthModule, JwtAuthGuard, RolesGuard } from './modules/auth';
import { PrismaModule } from './common';
import { RolesModule } from './modules/roles';
import { UsersModule } from './modules/users';
import { VerificatedUserModule } from './modules/verificated-user';
import { CategoryModule } from './modules/category';
import { PostModule } from './modules/post';
import { FileUploadModule } from './common/multer';
import { ProductModule } from './modules/product';
import { ProductImageModule } from './modules/product-image';
import { ProductInformationModule } from './modules/product-information';
import { ShippingServiceModule } from './modules/shipping-service/shipping-service.module';
import { OrderModule } from './modules/order/order.module';

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
    RolesModule,
    UsersModule,
    CategoryModule,
    PostModule,
    ProductModule,
    ProductImageModule,
    ProductInformationModule,
    ShippingServiceModule,
    OrderModule,
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

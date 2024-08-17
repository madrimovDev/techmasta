import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { seed, swaggerBootstrap } from './common';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

config();

async function bootstrap(port: string | number) {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173'],
  });
  // app.use(
  //   helmet({
  //     crossOriginResourcePolicy: {
  //       policy: 'cross-origin',
  //     },
  //   }),
  // );
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      always: true,
      exceptionFactory: (err) => {
        const custom = err.map((e) => ({
          property: e.property,
          messages: Object.entries(e.constraints).map((val) => val[1]),
        }));
        return new BadRequestException(custom);
      },
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });
  swaggerBootstrap(app);

  await seed(app);
  await app.listen(port);
  return port;
}

bootstrap(process.env.PORT || 300).then((port) => {
  Logger.log(`Server running at http://localhost:${port}/api/v1`, 'Server');
  Logger.log(`Swagger running at http://localhost:${port}/docs`, 'Swagger');
});

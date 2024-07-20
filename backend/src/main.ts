import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules';
import { config } from 'dotenv';
import { seed, swaggerBootstrap } from './common';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

config();

async function bootstrap(port: string | number) {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: 'cross-origin',
      },
    }),
  );
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      always: true,
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

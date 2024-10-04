import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { swaggerBootstrap } from './common';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Use cookie parser middleware
  app.use(cookieParser());

  // Enable CORS for specified origins
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173'],
  });

  // Use helmet for security headers
  app.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: 'cross-origin',
      },
    }),
  );

  // Global validation pipes with custom error handling
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      always: true,
      exceptionFactory: (errors) => {
        const customErrors = errors.map((error) => ({
          property: error.property,
          messages: Object.values(error.constraints),
        }));
        return new BadRequestException(customErrors);
      },
    }),
  );

  // Set global prefix for the API
  app.setGlobalPrefix('api/v1');

  // Serve static assets from the uploads directory
  app.useStaticAssets(join(__dirname, '..', '../uploads'), {
    prefix: '/uploads',
  });
  // Initialize Swagger for API documentation
  swaggerBootstrap(app);

  // Start the server on the provided port
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);

  Logger.log(`Server running at http://localhost:${port}/api/v1`, 'Server');
  Logger.log(`Swagger running at http://localhost:${port}/docs`, 'Swagger');
}

bootstrap().catch((err) => {
  Logger.error(`Error starting server: ${err.message}`, '', 'Bootstrap');
});

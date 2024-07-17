import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const swaggerConfig = new DocumentBuilder()
  .setTitle('TechMasta')
  .setDescription('TechMasta API documentation')
  .setVersion('1.0')
  .addBearerAuth({
    name: 'JWT',
    type: 'http',
    bearerFormat: 'Bearer',
  })
  .build();

export const swaggerBootstrap = (app: INestApplication) => {
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, swaggerDoc, {
    swaggerOptions: {
      filter: true,
      persistAuthorization: true,
    },
  });
};

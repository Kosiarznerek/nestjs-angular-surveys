import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configuration = new DocumentBuilder()
    .setTitle('Surveys backend service')
    .setVersion('1.0')
    .build();
  const openAPIObject = SwaggerModule.createDocument(app, configuration);
  SwaggerModule.setup('docs', app, openAPIObject, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });

  await app.listen(3000);
}
bootstrap();

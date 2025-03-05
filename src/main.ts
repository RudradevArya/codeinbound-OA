import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Code Snippet API')
    .setDescription('API for managing code snippets')
    .setVersion('1.0')
    .addTag('snippets')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const configService = app.get(ConfigService);
  
  const jwtSecret = configService.get<string>('JWT_SEC');
  if (!jwtSecret) {
    throw new Error('JWT_SEC is not defined in the environment variables');
  }

  await app.listen(3000);
}
bootstrap();

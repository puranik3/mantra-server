import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app/app.module';
// import { RolesGuard } from '@/auth/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  app.use(helmet());
  app.enableCors({
    origin: '*',
  });

  // app.useGlobalGuards(new RolesGuard());

  const config = new DocumentBuilder()
    .setTitle('Mantra - Online store')
    .setDescription('The documentation for Mantra - Online Store API')
    .setVersion('1.0')
    .addTag('mantra')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 3001;

  await app.listen(PORT, () => {
    const logger = app.get(Logger);
    logger.log(`Check http://localhost:${PORT}/api`);
  });
}

bootstrap();

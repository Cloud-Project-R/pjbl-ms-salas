import 'reflect-metadata';
import { existsSync } from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrosDoDominioFilter } from './api/erros-do-dominio.filter';
import { AppModule } from './app.module';
import { conectarMongo } from './infrastructure/mongo/conexao-mongo';

/** Sobe o servidor HTTP e o Swagger em /docs. */
async function iniciar() {
  // Em ambiente local lê o arquivo .env. Na nuvem as variáveis já vêm do Azure.
  if (existsSync('.env')) {
    process.loadEnvFile('.env');
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('A variável MONGODB_URI não foi definida (veja o .env.example).');
  }
  await conectarMongo(mongoUri);

  const app = await NestFactory.create(AppModule);

  // Segurança: recusa campos desconhecidos e dados em formato errado
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new ErrosDoDominioFilter());

  // CORS só para uso local: na nuvem quem cuida disso é o API Gateway
  if (process.env.ENABLE_CORS === 'true') {
    app.enableCors();
  }

  const configSwagger = new DocumentBuilder()
    .setTitle('MS Salas')
    .setDescription('Microserviço de Salas da Plataforma de Reservas (MongoDB Atlas)')
    .setVersion('1.0')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, configSwagger));

  const porta = Number(process.env.PORT ?? 3000);
  await app.listen(porta);
  console.log(`MS Salas rodando na porta ${porta}. Swagger em /docs`);
}

iniciar();

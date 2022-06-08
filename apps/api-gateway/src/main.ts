import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { getNatsTransportOptions } from '@app/nats-communicator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.connectMicroservice<MicroserviceOptions>(getNatsTransportOptions());

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('The API Gateway, mapper to other microservices')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();
  await app.listen(3005);
}
bootstrap();

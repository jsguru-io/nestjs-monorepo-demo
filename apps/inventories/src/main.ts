import { NestFactory } from '@nestjs/core';
import { InventoriesModule } from './inventories.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { getNatsTransportOptions } from '@app/nats-communicator';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InventoriesModule,
    getNatsTransportOptions(),
  );

  await app.listen();
}
bootstrap();

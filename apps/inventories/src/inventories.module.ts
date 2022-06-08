import { Module } from '@nestjs/common';
import { InventoriesController } from './inventories.controller';
import { NatsCommunicatorModule } from '@app/nats-communicator';

@Module({
  imports: [NatsCommunicatorModule],
  controllers: [InventoriesController],
  providers: [],
})
export class InventoriesModule {}

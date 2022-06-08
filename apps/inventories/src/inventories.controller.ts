import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InventoryDTO } from '@app/dto';
import { sleep } from '@app/util';
import * as _ from 'lodash';
import { NatsCommunicatorService } from '@app/nats-communicator';

@Controller()
export class InventoriesController {
  constructor(private readonly communicator: NatsCommunicatorService) {}

  @EventPattern('addInventory')
  async addInventory({ id }): Promise<void> {
    await sleep(7000);

    this.communicator.getClient().emit('addedInventory', <InventoryDTO>{
      id: _.random(10000, 99999).toString(),
      name: 'Default inventory',
      userId: id,
      items: _.range(0, 4).map((index: number) => ({
        id: _.random(10000, 99999).toString(),
        name: `Random Item ${index}`,
        price: _.random(100, 99999),
      })),
    });
  }
}

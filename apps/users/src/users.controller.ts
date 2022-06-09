import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { NatsCommunicatorService } from '@app/nats-communicator';
import { UsersService } from './users.service';
import { InventoryDTO, UserDTO } from "@app/dto";
import { sleep } from "@app/util";

@Controller()
export class UsersController {
  constructor(
    private readonly communicator: NatsCommunicatorService,
    private readonly usersService: UsersService,
  ) {}

  @MessagePattern('sum')
  accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }

  @EventPattern('userCreated')
  async userCreated(data: Record<string, any>) {
    this.communicator.getClient().emit('imageUploaded', {
      url: 'https://www.example.com/?brother=believe&baby=anger',
    });
  }

  @MessagePattern('getUsers')
  async find(): Promise<UserDTO[]> {
    return this.usersService.find();
  }

  @MessagePattern('getUser')
  async findById(id: string): Promise<UserDTO> {
    return this.usersService.findById(id);
  }

  @MessagePattern('createUser')
  async create(data: UserDTO): Promise<UserDTO> {
    return this.usersService.create(data);
  }

  @MessagePattern('updateUser')
  async update({ id, payload }): Promise<UserDTO> {
    return this.usersService.update(id, payload);
  }

  @MessagePattern('removeUser')
  async remove(id: string): Promise<null> {
    return this.usersService.remove(id);
  }

  @EventPattern('uploadLogo')
  async uploadLogo({ id, logo }): Promise<null> {
    await sleep(5000);
    return this.usersService.addLogo(id, logo);
  }

  @EventPattern('addedInventory')
  async onAddedInventory(data: InventoryDTO): Promise<void> {
    const user: UserDTO = await this.usersService.findById(data.userId);
    await this.usersService.update(data.userId, {
      ...user,
      inventories: [data],
    });
  }
}

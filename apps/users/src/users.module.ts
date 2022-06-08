import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NatsCommunicatorModule } from '@app/nats-communicator';

@Module({
  imports: [NatsCommunicatorModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

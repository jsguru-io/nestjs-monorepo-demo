import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { NatsCommunicatorModule } from "@app/nats-communicator";

@Module({
  imports: [NatsCommunicatorModule],
  controllers: [UserController],
})
export class UserModule {}

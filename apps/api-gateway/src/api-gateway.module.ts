import { Module, ValidationPipe } from '@nestjs/common';
import { NatsCommunicatorModule } from '@app/nats-communicator';
import { UserModule } from './user/user.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [NatsCommunicatorModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ transform: true }),
    },
  ],
})
export class ApiGatewayModule {}

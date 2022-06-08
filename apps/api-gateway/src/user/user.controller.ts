import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NatsCommunicatorService } from '@app/nats-communicator';
import { firstValueFrom } from 'rxjs';
import { UserDTO } from '@app/dto';
import { UploadLogoDTO } from './dto/upload-logo.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly communicator: NatsCommunicatorService) {}

  @ApiOkResponse({ type: [UserDTO] })
  @Get()
  async find(): Promise<UserDTO[]> {
    return firstValueFrom(this.communicator.getClient().send('getUsers', {}));
  }

  @ApiOkResponse({ type: UserDTO })
  @Post()
  async create(@Body() payload: UserDTO): Promise<UserDTO> {
    return firstValueFrom(
      this.communicator.getClient().send('createUser', payload),
    );
  }

  @ApiOkResponse({ type: UserDTO })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserDTO> {
    return firstValueFrom(this.communicator.getClient().send('getUser', id));
  }

  @ApiOkResponse({ type: UserDTO })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UserDTO,
  ): Promise<UserDTO> {
    return firstValueFrom(
      this.communicator.getClient().send('updateUser', { id, payload }),
    );
  }

  @ApiNoContentResponse()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await firstValueFrom(this.communicator.getClient().send('removeUser', id));
  }

  @Put(':id/upload-logo')
  async uploadLogo(
    @Param('id') id: string,
    @Body() payload: UploadLogoDTO,
  ): Promise<void> {
    await firstValueFrom(
      this.communicator
        .getClient()
        .emit('uploadLogo', { id, logo: payload.logo }),
    );
  }

  @Put(':id/inventory')
  async addInventory(@Param('id') id: string) {
    await firstValueFrom(
      this.communicator.getClient().emit('addInventory', { id }),
    );
  }
}

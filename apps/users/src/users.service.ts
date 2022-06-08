import { Injectable } from '@nestjs/common';
import { InventoryDTO, UserDTO } from '@app/dto';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  private users: UserDTO[] = [];

  async find(): Promise<UserDTO[]> {
    return this.users;
  }

  async create(payload: UserDTO): Promise<UserDTO> {
    this.users.push(payload);
    return payload;
  }

  async findById(id: string): Promise<UserDTO> {
    return this.users.find((user: UserDTO) => user.id === id);
  }

  async update(id: string, data: UserDTO): Promise<UserDTO> {
    this.users = this.users.map((user: UserDTO) => {
      if (user.id !== id) {
        return user;
      }
      return data;
    });
    return data;
  }

  async remove(id: string): Promise<null> {
    this.users = this.users.filter((user: UserDTO) => user.id !== id);
    return null;
  }

  async addLogo(id: string, logo: string): Promise<null> {
    this.users = this.users.map((user: UserDTO) => {
      if (user.id !== id) {
        return user;
      }
      return {
        ...user,
        logo,
      };
    });
    return null;
  }


}

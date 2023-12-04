import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { IUsersRespository } from './users.interface.respository';

@Injectable()
export class UsersRepository implements IUsersRespository {
  private users: UserEntity[] = [];

  async create(user: UserEntity): Promise<UserEntity> {
    await this.users.push(user);
    return user;
  }

  async findAll() {
    return this.users;
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    const user = await this.users.find((user) => user.id === id);
    if (user) {
      return user;
    }

    return null;
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.users.find((user) => user.email === email);
    if (user) {
      return user;
    }

    return null;
  }

  async update(id: string, user: UserEntity): Promise<UserEntity | null> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users[userIndex] = user;
    return user;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

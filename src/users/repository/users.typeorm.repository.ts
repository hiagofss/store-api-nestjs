import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { IUsersRespository } from './users.interface.respository';

@Injectable()
export class UsersTypeORMRepository implements IUsersRespository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(user): Promise<UserEntity> {
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findUserById(id): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findUserByEmail(email): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async update(id, user): Promise<UserEntity> {
    const categoryToUpdate = await this.usersRepository.findOne({
      where: { id },
    });

    if (!categoryToUpdate) {
      throw new Error('User not found');
    }

    Object.assign(categoryToUpdate, user);

    await this.usersRepository.save(categoryToUpdate);

    return categoryToUpdate;
  }

  async delete(id): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

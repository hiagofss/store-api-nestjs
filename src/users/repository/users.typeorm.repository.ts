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

  async create(user) {
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findUserById(id) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findUserByEmail(email) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async update(id, user) {
    const categoryToUpdate = await this.usersRepository.findOne({
      where: { id },
    });

    categoryToUpdate.name = user.name;
    categoryToUpdate.email = user.email;
    categoryToUpdate.password = user.password;

    await this.usersRepository.save(categoryToUpdate);

    return categoryToUpdate;
  }

  async delete(id) {
    await this.usersRepository.delete(id);
  }
}

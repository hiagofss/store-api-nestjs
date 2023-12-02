import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersTypeORMRepository {
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
    return await this.usersRepository.findOne(id);
  }

  async findUserByEmail(email) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async update(id, user) {
    await this.usersRepository.update(id, user);
    return await this.usersRepository.findOne(id);
  }
  async delete(id) {
    await this.usersRepository.delete(id);
  }
}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repository/users.repository';
import { IsUniqueEmailValidator } from './validator/is-unique-email.validator';

@Module({
  controllers: [UsersController],
  providers: [UsersService, IsUniqueEmailValidator, UsersRepository],
})
export class UsersModule {}

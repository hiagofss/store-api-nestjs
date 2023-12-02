import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repository/users.repository';
import { IUsersRespository } from './repository/users-respository.interface';
import { IsUniqueEmailValidator } from './validator/is-unique-email.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersTypeORMRepository } from './repository/users.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersTypeORMRepository])],
  controllers: [UsersController],
  providers: [
    IsUniqueEmailValidator,
    UsersService,
    {
      provide: IUsersRespository,
      useClass: UsersRepository,
    },
  ],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repository/users.repository';
import { IUsersRespository } from './repository/users.interface.respository';
import { IsUniqueEmailValidator } from './validator/is-unique-email.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersTypeORMRepository } from './repository/users.typeorm.repository';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    IsUniqueEmailValidator,
    UsersService,
    {
      provide: IUsersRespository,
      useClass: UsersTypeORMRepository,
    },
  ],
})
export class UsersModule {}

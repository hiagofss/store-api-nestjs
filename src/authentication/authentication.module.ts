import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserEntity } from '../users/entities/user.entity';
import { IUsersRespository } from '../users/repository/users.interface.respository';
import { UsersTypeORMRepository } from '../users/repository/users.typeorm.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '72h' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      provide: IUsersRespository,
      useClass: UsersTypeORMRepository,
    },
  ],
})
export class AuthenticationModule {}

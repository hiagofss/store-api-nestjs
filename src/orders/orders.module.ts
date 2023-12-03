import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { IOrdersRespository } from './repository/orders.interface.respository';
import { OrdersTypeORMRepository } from './repository/orders.typeorm.repository';
import { IUsersRespository } from 'src/users/repository/users.interface.respository';
import { UsersTypeORMRepository } from 'src/users/repository/users.typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity])],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: IOrdersRespository,
      useClass: OrdersTypeORMRepository,
    },
    {
      provide: IUsersRespository,
      useClass: UsersTypeORMRepository,
    },
  ],
})
export class OrdersModule {}

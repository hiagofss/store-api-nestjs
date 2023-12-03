import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { IOrdersRespository } from './repository/orders.interface.respository';
import { OrdersTypeORMRepository } from './repository/orders.typeorm.repository';
import { IUsersRespository } from '../users/repository/users.interface.respository';
import { UsersTypeORMRepository } from '../users/repository/users.typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { UserEntity } from '../users/entities/user.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { IProductsRespository } from '../products/repository/products.interface.respository';
import { ProductsTypeORMRepository } from '../products/repository/products.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity, ProductEntity])],
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
    {
      provide: IProductsRespository,
      useClass: ProductsTypeORMRepository,
    },
  ],
})
export class OrdersModule {}

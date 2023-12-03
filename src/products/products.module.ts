import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { IProductsRespository } from './repository/products.interface.respository';
import { ProductsTypeORMRepository } from './repository/products.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: IProductsRespository,
      useClass: ProductsTypeORMRepository,
    },
  ],
})
export class ProductsModule {}

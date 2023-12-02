import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { IProductsRespository } from './products.interface.respository';

@Injectable()
export class ProductsTypeORMRepository implements IProductsRespository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  async create(product) {
    return await this.productsRepository.save(product);
  }

  async find() {
    return await this.productsRepository.find();
  }

  async findById(id) {
    return await this.productsRepository.findOne({ where: { id } });
  }

  async update(id, product) {
    const categoryToUpdate = await this.productsRepository.findOne({
      where: { id },
    });

    categoryToUpdate.name = product.name;
    categoryToUpdate.description = product.description;
    categoryToUpdate.price = product.price;
    categoryToUpdate.stock = product.quantity;
    categoryToUpdate.category = product.category;

    await this.productsRepository.save(categoryToUpdate);

    return categoryToUpdate;
  }

  async delete(id) {
    await this.productsRepository.delete(id);
  }
}

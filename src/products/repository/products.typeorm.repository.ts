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

  async create(product): Promise<ProductEntity> {
    return await this.productsRepository.save(product);
  }

  async find(): Promise<ProductEntity[]> {
    return await this.productsRepository.find();
  }

  async findById(id): Promise<ProductEntity | null> {
    return await this.productsRepository.findOne({ where: { id } });
  }

  async update(id, product): Promise<ProductEntity> {
    const categoryToUpdate = await this.productsRepository.findOne({
      where: { id },
    });

    if (!categoryToUpdate) {
      throw new Error('Product not found');
    }

    Object.assign(categoryToUpdate, product);

    await this.productsRepository.save(categoryToUpdate);

    return categoryToUpdate;
  }

  async delete(id): Promise<void> {
    await this.productsRepository.delete(id);
  }
}

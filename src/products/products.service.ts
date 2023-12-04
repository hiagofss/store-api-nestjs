import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { IProductsRespository } from './repository/products.interface.respository';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(IProductsRespository)
    private readonly productsRepository: IProductsRespository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = new ProductEntity();

    Object.assign(product, createProductDto as ProductEntity);

    const productCreated = await this.productsRepository.create(product);

    return productCreated;
  }

  async findAll() {
    const products = await this.productsRepository.find();
    return products;
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    Object.assign(product, updateProductDto as ProductEntity);

    const productUpdated = await this.productsRepository.update(id, product);

    return productUpdated;
  }

  async remove(id: string) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    await this.productsRepository.delete(id);
    return `Product with id #${id} was deleted`;
  }
}

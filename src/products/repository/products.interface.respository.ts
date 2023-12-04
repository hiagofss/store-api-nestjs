import { ProductEntity } from '../entities/product.entity';

export interface IProductsRespository {
  create(user: ProductEntity);
  find(): Promise<ProductEntity[]>;
  findById(id: string);
  update(id: string, user: ProductEntity);
  delete(id: string);
}

export const IProductsRespository = Symbol('IProductsRespository');

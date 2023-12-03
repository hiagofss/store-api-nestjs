import { OrderEntity } from '../entities/order.entity';

export interface IOrdersRespository {
  create(user: OrderEntity);
  find();
  findById(id: string);
  update(id: string, user: OrderEntity);
  delete(id: string);
}

export const IOrdersRespository = Symbol('IOrdersRespository');

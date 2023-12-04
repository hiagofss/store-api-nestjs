import { OrderEntity } from '../entities/order.entity';

export interface IOrdersRespository {
  create(user: OrderEntity): Promise<OrderEntity>;
  find(): Promise<OrderEntity[]>;
  findById(id: string): Promise<OrderEntity | null>;
  update(id: string, user: OrderEntity): Promise<OrderEntity | null>;
  delete(id: string): Promise<void>;
}

export const IOrdersRespository = Symbol('IOrdersRespository');

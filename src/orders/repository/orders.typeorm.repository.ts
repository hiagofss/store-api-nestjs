import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { IOrdersRespository } from './orders.interface.respository';

@Injectable()
export class OrdersTypeORMRepository implements IOrdersRespository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
  ) {}

  async create(order) {
    return await this.ordersRepository.save(order);
  }

  async find() {
    return await this.ordersRepository.find();
  }

  async findById(id) {
    return await this.ordersRepository.findOne({ where: { id } });
  }

  async update(id, order) {
    const categoryToUpdate = await this.ordersRepository.findOne({
      where: { id },
    });

    await this.ordersRepository.save(categoryToUpdate);

    return categoryToUpdate;
  }

  async delete(id) {
    await this.ordersRepository.delete(id);
  }
}

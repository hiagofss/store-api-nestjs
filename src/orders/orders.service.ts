import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IUsersRespository } from 'src/users/repository/users.interface.respository';
import { IOrdersRespository } from './repository/orders.interface.respository';
import { OrderEntity } from './entities/order.entity';
import { OrderStatus } from './enum/OrderStatus.enum';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(IUsersRespository)
    private readonly usersRepository: IUsersRespository,
    @Inject(IOrdersRespository)
    private readonly ordersRepository: IOrdersRespository,
  ) {}
  async create(userId: string, createOrderDto: CreateOrderDto) {
    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const order = new OrderEntity();
    order.user = user;
    order.status = OrderStatus.PENDING;
    order.amount = 12321;

    const orderCreated = await this.ordersRepository.create(order);

    return orderCreated;
  }

  findAll() {
    const orders = this.ordersRepository.find();

    return orders;
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}

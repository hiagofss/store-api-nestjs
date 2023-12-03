import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IUsersRespository } from 'src/users/repository/users.interface.respository';
import { IOrdersRespository } from './repository/orders.interface.respository';
import { OrderEntity } from './entities/order.entity';
import { OrderStatus } from './enum/OrderStatus.enum';
import { OrderItemEntity } from './entities/order-item.entity';
import { IProductsRespository } from 'src/products/repository/products.interface.respository';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(IUsersRespository)
    private readonly usersRepository: IUsersRespository,
    @Inject(IOrdersRespository)
    private readonly ordersRepository: IOrdersRespository,
    @Inject(IProductsRespository)
    private readonly productsRepository: IProductsRespository,
  ) {}
  async create(userId: string, createOrderDto: CreateOrderDto) {
    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const products = await this.productsRepository.find();

    const order = new OrderEntity();
    order.user = user;
    order.status = OrderStatus.PENDING;
    const orderItemsEntitys = createOrderDto.orderItems.map((item) => {
      const productOrderItem = products.find(
        (product) => product.id === item.productId,
      );
      const orderItemEntity = new OrderItemEntity();
      orderItemEntity.product = productOrderItem;
      orderItemEntity.quantity = item.quantity;
      orderItemEntity.saleAmount = productOrderItem.price;
      orderItemEntity.product.stock -= item.quantity;
      return orderItemEntity;
    });

    const totalAmount = orderItemsEntitys.reduce(
      (total, item) => total + item.saleAmount * item.quantity,
      0,
    );

    order.itens = orderItemsEntitys;
    order.amount = totalAmount;

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

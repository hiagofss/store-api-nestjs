import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IUsersRespository } from '../users/repository/users.interface.respository';
import { IOrdersRespository } from './repository/orders.interface.respository';
import { OrderEntity } from './entities/order.entity';
import { OrderStatus } from './enum/OrderStatus.enum';
import { OrderItemEntity } from './entities/order-item.entity';
import { IProductsRespository } from '../products/repository/products.interface.respository';

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
      if (!productOrderItem) {
        throw new NotFoundException('Product not found');
      }

      if (productOrderItem.stock <= item.quantity) {
        throw new BadRequestException('Product out of stock');
      }

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

  async findOne(id: string) {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    Object.assign(order, updateOrderDto as OrderEntity);

    await this.ordersRepository.update(id, order);

    return `This action updates a #${id} order`;
  }

  async remove(id: string) {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    await this.ordersRepository.delete(id);

    return `This action removes a #${id} order`;
  }
}

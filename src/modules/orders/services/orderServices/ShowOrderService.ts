import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import { OrdersRepository } from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import { getCustomRepository } from 'typeorm';

import { BadRequestError } from '@shared/errors/BadRequestError';

interface IRequest {
  id: string;
}

class ShowOrderService {
  async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new BadRequestError('Order not found.');
    }

    return order;
  }
}

export { ShowOrderService };

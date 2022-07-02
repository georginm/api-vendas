import { CreateOrderService } from '@modules/orders/services/orderServices/CreateOrderService';
import { Request, Response } from 'express';

class CreateOrderController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { customerId, products } = request.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({ customerId, products });

    return response.json(order);
  }
}

export { CreateOrderController };

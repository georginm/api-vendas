import { ShowOrderService } from '@modules/orders/services/orderServices/ShowOrderService';
import { Request, Response } from 'express';

class ShowOrderController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = new ShowOrderService();

    const order = await showOrder.execute({ id });

    return response.json(order);
  }
}

export { ShowOrderController };

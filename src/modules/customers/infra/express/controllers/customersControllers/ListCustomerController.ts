import { ListCustomerService } from '@modules/customers/services/customerServices/ListCustomerService';
import { Request, Response } from 'express';

class ListCustomersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListCustomerService();

    const customers = await listCustomers.execute();

    return response.json(customers);
  }
}

export { ListCustomersController };

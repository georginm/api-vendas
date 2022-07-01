import { UpdateCustomerService } from '@modules/customers/services/customerServices/UpdateCustomerService';
import { Request, Response } from 'express';

class UpdateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const createCustomer = new UpdateCustomerService();
    const customer = await createCustomer.execute({ id, name, email });

    return response.json(customer);
  }
}

export { UpdateCustomerController };

import { CreateCustomerService } from '@modules/customers/services/customerServices/CreateCustomerService';
import { Request, Response } from 'express';

class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomer = new CreateCustomerService();
    const customer = await createCustomer.execute({ name, email });

    return response.status(201).json(customer);
  }
}

export { CreateCustomerController };

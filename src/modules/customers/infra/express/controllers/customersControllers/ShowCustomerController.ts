import { ShowCustomerService } from '@modules/customers/services/customerServices/ShowCustomerService';
import { Request, Response } from 'express';

class ShowCustomerController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomer = new ShowCustomerService();

    const customer = await showCustomer.execute({ id });

    return response.json(customer);
  }
}

export { ShowCustomerController };

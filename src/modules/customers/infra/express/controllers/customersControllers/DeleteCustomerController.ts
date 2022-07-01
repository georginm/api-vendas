import { DeleteCustomerService } from '@modules/customers/services/customerServices/DeleteCustomerService';
import { Request, Response } from 'express';

class DeleteCustomerController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = new DeleteCustomerService();

    await deleteCustomer.execute({ id });

    return response.status(204).json();
  }
}

export { DeleteCustomerController };

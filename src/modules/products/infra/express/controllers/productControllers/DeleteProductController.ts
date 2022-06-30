import { DeleteProductService } from '@modules/products/services/productServices/deleteProductService/DeleteProductService';
import { Request, Response } from 'express';

class DeleteProductController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProductService = new DeleteProductService();

    deleteProductService.execute({ id });

    return response.status(204).send();
  }
}

export { DeleteProductController };

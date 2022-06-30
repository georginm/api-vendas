import { UpdateProductService } from '@modules/products/services/productServices/updateProductService/UpdateProductService';
import { Request, Response } from 'express';

class UpdateProductController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const { id } = request.params;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({ id, name, price, quantity });

    return response.json(product);
  }
}

export { UpdateProductController };

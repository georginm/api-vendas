import { CreateProductService } from '@modules/products/services/productServices/createProductService/CreateProductService';
import { Request, Response } from 'express';

class CreateProductController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({ name, price, quantity });

    return response.json(product);
  }
}

export { CreateProductController };

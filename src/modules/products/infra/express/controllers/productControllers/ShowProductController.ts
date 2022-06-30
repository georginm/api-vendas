import { ShowProductService } from '@modules/products/services/productServices/showProductService/ShowProductService';
import { Request, Response } from 'express';

class ShowProductController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ id });

    return response.json(product);
  }
}

export { ShowProductController };

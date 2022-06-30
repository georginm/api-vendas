import { ListProductService } from '@modules/products/services/productServices/listProductService/ListProductService';
import { Request, Response } from 'express';

class ListProductController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listProductService = new ListProductService();

    const products = await listProductService.execute();

    return response.json(products);
  }
}

export { ListProductController };

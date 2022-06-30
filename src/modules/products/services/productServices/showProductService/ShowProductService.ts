import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';

import { BadRequestError } from '@shared/errors/BadRequestError';

interface IRequest {
  id: string;
}

class ShowProductService {
  async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new BadRequestError('Product not found');
    }

    return product;
  }
}

export { ShowProductService };

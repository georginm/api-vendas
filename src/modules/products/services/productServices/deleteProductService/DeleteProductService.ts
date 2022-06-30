import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';

import { BadRequestError } from '@shared/errors/BadRequestError';

interface IRequest {
  id: string;
}

class DeleteProductService {
  async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new BadRequestError('Product not found');
    }

    productsRepository.remove(product);
  }
}

export { DeleteProductService };

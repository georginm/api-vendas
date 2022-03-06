import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';
import { BadRequestError } from '@shared/errors/BadRequestError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class ShowProductService {
  async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (product) {
      return product;
    }

    throw new BadRequestError('Product not found');
  }
}

export { ShowProductService };

import { Product } from '@modules/products/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';
import { BadRequestError } from '@shared/errors/BadRequestError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class ShowProductRepository {
  async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (product) {
      return product;
    }

    throw new BadRequestError('Product not found');
  }
}

export { ShowProductRepository };

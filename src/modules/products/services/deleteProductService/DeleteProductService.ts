import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';
import { BadRequestError } from '@shared/errors/BadRequestError';

interface IRequest {
  id: string;
}

class DeleteProductRepository {
  async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (product) {
      productsRepository.remove(product);
    }

    throw new BadRequestError('Product not found');
  }
}

export { DeleteProductRepository };

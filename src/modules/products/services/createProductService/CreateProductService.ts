import { Product } from '@modules/products/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';
import { BadRequestError } from '@shared/errors/BadRequestError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new BadRequestError('There is already one product with this name');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export { CreateProductService };

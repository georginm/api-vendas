import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';
import { BadRequestError } from '@shared/errors/BadRequestError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductRepository {
  async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new BadRequestError('Product not found');
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new BadRequestError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}

export { UpdateProductRepository };

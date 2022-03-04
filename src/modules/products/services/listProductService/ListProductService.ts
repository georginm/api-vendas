import { Product } from '@modules/products/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';

class ListProductRepository {
  async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const products = await productsRepository.find();

    return products;
  }
}

export { ListProductRepository };

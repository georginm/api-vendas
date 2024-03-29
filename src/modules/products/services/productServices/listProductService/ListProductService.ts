import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';

import { redisCache } from '@shared/cache/RedisCache';

class ListProductService {
  async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    let products = await redisCache.recover<Product[]>(
      'APIVENDAS-[PRODUCT_LIST]'
    );

    if (!products) {
      products = await productsRepository.find();

      await redisCache.save('APIVENDAS-[PRODUCT_LIST]', products);
    }

    return products;
  }
}

export { ListProductService };

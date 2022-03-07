import { EntityRepository, Repository } from 'typeorm';

import { BadRequestError } from '@shared/errors/BadRequestError';

import { Product } from '../entities/Product';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product> {
    const product = await this.findOne({ where: { name } });

    if (product) {
      return product;
    }

    throw new BadRequestError('Product not exists');
  }
}

export { ProductRepository };

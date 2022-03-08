import { EntityRepository, Repository } from 'typeorm';

import { Product } from '../entities/Product';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | null> {
    const product = await this.findOne({ where: { name } });

    if (!product) {
      return null;
    }

    return product;
  }
}

export { ProductRepository };

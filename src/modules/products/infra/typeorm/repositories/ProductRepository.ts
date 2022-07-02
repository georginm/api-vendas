import { EntityRepository, In, Repository } from 'typeorm';

import { Product } from '../entities/Product';

interface IFindProducts {
  id: string;
}

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | null> {
    const product = await this.findOne({ where: { name } });

    if (!product) {
      return null;
    }

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map((product) => product.id);

    const existsProducts = await this.find({
      where: {
        id: In(productIds),
      },
    });

    return existsProducts;
  }
}

export { ProductRepository };

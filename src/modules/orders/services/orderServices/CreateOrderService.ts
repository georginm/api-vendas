import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import { OrdersRepository } from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';

import { BadRequestError } from '@shared/errors/BadRequestError';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customerId: string;
  products: IProduct[];
}

class CreateOrderService {
  async execute({ customerId, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customersExists = await customersRepository.findById(customerId);

    if (!customersExists) {
      throw new BadRequestError(
        'Could not find any customer with the given id.'
      );
    }

    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new BadRequestError(
        'Could not find any products with the given ids.'
      );
    }

    const existsProductsIds = existsProducts.map((product) => product.id);

    const checkInexistentProducts = products.filter(
      (product) => !existsProductsIds.includes(product.id)
    );

    if (checkInexistentProducts.length) {
      throw new BadRequestError(
        `Could not find product ${checkInexistentProducts[0].id}.`
      );
    }

    const quantityAvailable = products.filter(
      (product) =>
        existsProducts.filter((prod) => prod.id === product.id)[0].quantity <
        product.quantity
    );

    if (quantityAvailable.length) {
      throw new BadRequestError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`
      );
    }

    const serializedProducts = products.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      price: existsProducts.filter((prod) => prod.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customersExists,
      products: serializedProducts,
    });

    const { orderProducts } = order;

    const updatedProductQuantity = orderProducts.map((product) => ({
      id: product.productId,
      quantity:
        existsProducts.filter((prod) => prod.id === product.id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}

export { CreateOrderService };

import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';

import { BadRequestError } from '@shared/errors/BadRequestError';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new BadRequestError('Customer not found.');
    }

    return customer;
  }
}

export { ShowCustomerService };

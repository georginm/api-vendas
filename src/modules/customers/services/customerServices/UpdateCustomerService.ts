import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';

import { BadRequestError } from '@shared/errors/BadRequestError';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, email, name }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new BadRequestError('Customer not found.');
    }

    const customerEmailExists = await customerRepository.findByEmail(email);

    if (customerEmailExists && email !== customer.email) {
      throw new BadRequestError('There onde already customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }
}

export { UpdateCustomerService };

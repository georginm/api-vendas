import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customers = customerRepository.find();

    return customers;
  }
}

export { ListCustomerService };

import { ICreateCustomerDTO } from '@modules/customers/dto/ICreateCustomerDTO';
import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';

import { BadRequestError } from '@shared/errors/BadRequestError';

class CreateCustomerService {
  public async execute({ name, email }: ICreateCustomerDTO): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const emailExists = await customerRepository.findByEmail(email);

    if (emailExists) {
      throw new BadRequestError('Email address already used.');
    }

    const customer = customerRepository.create({ name, email });

    await customerRepository.save(customer);

    return customer;
  }
}

export { CreateCustomerService };

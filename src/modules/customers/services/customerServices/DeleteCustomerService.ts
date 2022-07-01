import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';

import { BadRequestError } from '@shared/errors/BadRequestError';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new BadRequestError('Customer not found.');
    }

    await customerRepository.remove(customer);
  }
}

export { DeleteCustomerService };

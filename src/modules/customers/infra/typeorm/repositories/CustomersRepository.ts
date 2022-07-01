import { ICreateCustomerDTO } from '@modules/customers/dto/ICreateCustomerDTO';
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';
import { EntityRepository, Repository } from 'typeorm';

import { Customer } from '../entities/Customer';

@EntityRepository(Customer)
class CustomersRepository
  extends Repository<Customer>
  implements ICustomersRepository
{
  public async createCustomer({
    name,
    email,
  }: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.create({ name, email });

    return this.save(customer);
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const Customer = await this.findOne({
      where: {
        name,
      },
    });

    return Customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const Customer = await this.findOne({
      where: {
        id,
      },
    });

    return Customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const Customer = await this.findOne({
      where: {
        email,
      },
    });

    return Customer;
  }
}

export { CustomersRepository };

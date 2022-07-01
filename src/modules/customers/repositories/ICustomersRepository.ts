import { ICreateCustomerDTO } from '../dto/ICreateCustomerDTO';
import { Customer } from '../infra/typeorm/entities/Customer';

interface ICustomersRepository {
  findByName(name: string): Promise<Customer | undefined>;
  findByEmail(email: string): Promise<Customer | undefined>;
  findById(id: string): Promise<Customer | undefined>;
  createCustomer({ name, email }: ICreateCustomerDTO): Promise<Customer>;
}

export { ICustomersRepository };

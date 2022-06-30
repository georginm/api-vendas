import { ICreateUserDTO } from '../dto/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/Users';

interface IUsersRepository {
  findByName(name: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  createUser({ name, password, email }: ICreateUserDTO): Promise<User>;
}

export { IUsersRepository };

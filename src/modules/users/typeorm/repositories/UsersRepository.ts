import { ICreateUserDTO } from '@modules/users/dto/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entities/Users';

@EntityRepository(User)
class UsersRepository extends Repository<User> implements IUsersRepository {
  public async createUser({
    name,
    password,
    email,
  }: ICreateUserDTO): Promise<User> {
    const user = this.create({ name, email, password });

    return this.save(user);
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

export { UsersRepository };

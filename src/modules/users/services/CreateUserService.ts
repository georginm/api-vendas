import { getCustomRepository } from 'typeorm';

import { BadRequestError } from '@shared/errors/BadRequestError';

import { ICreateUserDTO } from '../dto/ICreateUserDTO';
import { User } from '../typeorm/entities/Users';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) throw new BadRequestError('Email already used');

    const user = usersRepository.createUser({ name, email, password });

    return user;
  }
}

export { CreateUserService };

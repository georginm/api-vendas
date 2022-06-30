import { ICreateUserDTO } from '@modules/users/dto/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/Users';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import { BadRequestError } from '@shared/errors/BadRequestError';

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) throw new BadRequestError('Email already used');

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export { CreateUserService };

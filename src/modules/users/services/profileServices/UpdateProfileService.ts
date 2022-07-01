import { User } from '@modules/users/infra/typeorm/entities/Users';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import { BadRequestError } from '@shared/errors/BadRequestError';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

class UpdateProfileService {
  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new BadRequestError('User does not exists.');
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user.id) {
      throw new BadRequestError('There is already one user with this email.');
    }

    if (password && !oldPassword) {
      throw new BadRequestError('Old password is required');
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);

      if (!checkOldPassword) {
        throw new BadRequestError('Old password does not match');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export { UpdateProfileService };

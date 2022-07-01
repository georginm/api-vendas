import { User } from '@modules/users/infra/typeorm/entities/Users';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';

import { BadRequestError } from '@shared/errors/BadRequestError';

interface IRequest {
  userId: string;
}

class ShowProfileService {
  public async execute({ userId }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new BadRequestError('User does not exists.');
    }

    return user;
  }
}

export { ShowProfileService };

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import { BadRequestError } from '@shared/errors/BadRequestError';
import { UnauthorizedError } from '@shared/errors/UnauthorizedError';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new BadRequestError('User token does not exists.');
    }

    const user = await usersRepository.findById(userToken.userId);

    if (!user) {
      throw new BadRequestError('User does not exists.');
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new UnauthorizedError('Token expired');
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);
  }
}

export { ResetPasswordService };

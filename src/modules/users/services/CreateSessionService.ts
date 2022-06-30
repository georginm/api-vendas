import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import UnauthorizedError from '@shared/errors/UnauthorizedError';

import { ICreateSessionDTO } from '../dto/ICreateSessionDTO';
import { User } from '../infra/typeorm/entities/Users';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({
    email,
    password,
  }: ICreateSessionDTO): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError('Incorrect email/password combination');
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new UnauthorizedError('Incorrect email/password combination');
    }

    const token = await sign({}, 'asdasjd398has21398hdsfaasdag', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export { CreateSessionService };

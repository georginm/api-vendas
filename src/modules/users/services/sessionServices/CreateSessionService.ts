import { auth } from '@config/auth';
import { User } from '@modules/users/infra/typeorm/entities/Users';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import { UnauthorizedError } from '@shared/errors/UnauthorizedError';

interface IResponse {
  user: User;
  token: string;
}

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError('Incorrect email/password combination');
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new UnauthorizedError('Incorrect email/password combination');
    }

    const token = sign({}, auth.secret ? auth.secret : '123456', {
      subject: user.id,
      expiresIn: auth.expiresIn,
    });

    return { user, token };
  }
}

export { CreateSessionService };

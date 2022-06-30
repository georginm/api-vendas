import { ICreateTokenDTO } from '@modules/users/dto/ICreateTokenDTO';
import { IUserTokensRepository } from '@modules/users/repositories/IUsertokensRepository';
import { EntityRepository, Repository } from 'typeorm';

import { UserToken } from '../entities/UsersToken';

@EntityRepository(UserToken)
class UsersRepository
  extends Repository<UserToken>
  implements IUserTokensRepository
{
  public async generate({ userId }: ICreateTokenDTO): Promise<UserToken> {
    const userToken = this.create({ userId });

    return this.save(userToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }
}

export { UsersRepository };

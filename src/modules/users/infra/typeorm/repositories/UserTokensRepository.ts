import { IUserTokensRepository } from '@modules/users/repositories/IUsertokensRepository';
import { EntityRepository, Repository } from 'typeorm';

import { UserToken } from '../entities/UsersToken';

@EntityRepository(UserToken)
class UserTokensRepository
  extends Repository<UserToken>
  implements IUserTokensRepository
{
  public async generate(userId: string): Promise<UserToken | undefined> {
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

export { UserTokensRepository };

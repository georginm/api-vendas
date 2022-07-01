import { UserToken } from '../infra/typeorm/entities/UsersToken';

interface IUserTokensRepository {
  findByToken(token: string): Promise<UserToken | undefined>;
  generate(userId: string): Promise<UserToken>;
}

export { IUserTokensRepository };

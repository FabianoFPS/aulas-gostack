import { v4 as uuid } from 'uuid';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRepository {
  private usersToken: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();
    const userTokenParams: UserToken = {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };
    Object.assign(userToken, userTokenParams);
    this.usersToken.push(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.usersToken.find(findToken => findToken.token === token);
  }
}

export default FakeUserTokensRepository;

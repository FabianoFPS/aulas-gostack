import { v4 as uuid } from 'uuid';
import User from '@modules/users/infra/typeorm/entities/user';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/appointments/dtos/IFindAllProvidersDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_id)
      users = this.users.filter(user => user.id !== except_user_id);

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(
      user,
      { id: uuid() },
      {
        name,
        email,
        password,
      },
    );

    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    if (findIndex === -1) throw new Error('Usuário não encontrado');
    this.users[findIndex] = user;
    return this.users[findIndex];
  }
}

export default FakeUsersRepository;

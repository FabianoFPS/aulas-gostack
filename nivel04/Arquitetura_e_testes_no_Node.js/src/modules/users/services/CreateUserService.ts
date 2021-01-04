import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/user';
import AppError from '../erros/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) throw new AppError('Email adress already used.');

    const hashdPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashdPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;

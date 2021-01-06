import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  // delete user.password;

  // eslint-disable-next-line camelcase
  // const { id, name, created_at, updated_at } = user;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: ocultar, ...userResponse } = user;

  return response.json({ userResponse, token });
});

export default sessionsRouter;

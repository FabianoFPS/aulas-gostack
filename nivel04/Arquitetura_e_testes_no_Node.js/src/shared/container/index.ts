import { container } from 'tsyringe';

import '@modules/users/providers/';
import '@shared/container/providers/index';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
// import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
// import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IAppointmentsRepository>(
  'RgAppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'RgUsersRepository',
  UsersRepository,
);

// container.registerSingleton<IUserTokensRepository>(
//   'RgUsertokensRepository;',
//   UserTokensRepository,
// );

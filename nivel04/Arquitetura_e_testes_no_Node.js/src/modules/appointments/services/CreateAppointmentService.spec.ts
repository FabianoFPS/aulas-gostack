import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentServices from './CreateAppointmentService';

const mock_user_id = 'fffffffffffffffffffffff';
const mock_provider_id = 'asdf465d4f6sa4df';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentServices;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentServices(
      fakeAppointmentsRepository,
      fakeNotificationRepository,
      fakeCacheProvider,
    );
  });
  it('should de able to create a new appointment', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());

    const appointment = await createAppointment.execute({
      provider_id: mock_provider_id,
      user_id: mock_user_id,
      date: new Date(2020, 4, 10, 13),
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(mock_provider_id);
  });
  it('should not de able to create on the same time', async () => {
    const appointmentDate = new Date(3000, 4, 10, 13);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: mock_provider_id,
      user_id: mock_user_id,
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: mock_provider_id,
        user_id: mock_user_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('shout not be able to create an appointment on a past date', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: 'abcdef',
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('shout not be able to create an appointment with same user provider', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());
    const idsUserAndProvider = '123asd';
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: idsUserAndProvider,
        provider_id: idsUserAndProvider,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('shout not be able to create an appointment before 8am after 5pm', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: mock_user_id,
        provider_id: mock_provider_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: mock_user_id,
        provider_id: mock_provider_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

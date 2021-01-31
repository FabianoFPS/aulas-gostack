import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentServices from './CreateAppointmentService';

const mock_user_id = 'fffffffffffffffffffffff';
const mock_provider_id = 'asdf465d4f6sa4df';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentServices;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentServices(
      fakeAppointmentsRepository,
    );
  });
  it('should de able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      provider_id: mock_provider_id,
      user_id: mock_user_id,
      date: new Date(),
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(mock_provider_id);
  });

  it('should not de able to create on the same time', async () => {
    const appointmentDate = new Date();

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
});

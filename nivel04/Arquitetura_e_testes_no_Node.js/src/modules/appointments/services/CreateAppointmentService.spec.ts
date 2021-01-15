import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentServices from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should de able to create a new appointment', async () => {
    const mock_provider_id = 'asdf465d4f6sa4df';
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentServices(
      fakeAppointmentsRepository,
    );
    const appointment = await createAppointment.execute({
      provider_id: mock_provider_id,
      date: new Date(),
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(mock_provider_id);
  });

  it('should not de able to create on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentServices(
      fakeAppointmentsRepository,
    );
    const appointmentDate = new Date();
    const mock_provider_id = 'zzzzzzzzzzasdf465d4f6sa4df';

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: mock_provider_id,
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: mock_provider_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

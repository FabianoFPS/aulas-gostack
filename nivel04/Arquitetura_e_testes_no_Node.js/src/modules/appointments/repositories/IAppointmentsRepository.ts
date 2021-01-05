import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}

export default IAppointmentsRepository;

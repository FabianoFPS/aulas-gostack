import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointment {
  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate)
      throw new AppError('This appointment is already booked');

    const appointment: Appointment = await appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointment;

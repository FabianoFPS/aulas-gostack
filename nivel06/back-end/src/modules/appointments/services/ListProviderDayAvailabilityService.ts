import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  availability: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('RgAppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );
    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );
    // Date.now() precisa ser executado antes do map pois o resultado está mockado uma vez no teste unitário.
    const currentDate = new Date(Date.now());
    const availability = eachHourArray.map(hour => {
      const hasAppointInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );
      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        availability: !hasAppointInHour && isAfter(compareDate, currentDate),
      };
    });
    return availability;
  }
}

export default ListProviderDayAvailabilityService;

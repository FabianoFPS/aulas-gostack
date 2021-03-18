import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  availability: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('RgAppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );
    const numberOfDayInMonth = getDaysInMonth(new Date(year, month - 1));
    const eachDayArray = Array.from(
      { length: numberOfDayInMonth },
      (_, index) => index + 1,
    );
    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 17, 0, 0);
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });
      return {
        day,
        availability:
          isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
      };
    });
    return availability;
  }
}

export default ListProviderMonthAvailabilityService;

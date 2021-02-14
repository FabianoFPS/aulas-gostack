import { injectable, inject } from 'tsyringe';

import ICacheProvider, {
  ICacheProviderRegistri,
} from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppontmentsService {
  constructor(
    @inject('RgAppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject(ICacheProviderRegistri)
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;
    let appontments = await this.cacheProvider.recover<Appointment[]>(cacheKey);

    if (!appontments) {
      appontments = await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id,
        month,
        year,
        day,
      });
      await this.cacheProvider.save(cacheKey, appontments);
    }
    return appontments;
  }
}

export default ListProviderAppontmentsService;

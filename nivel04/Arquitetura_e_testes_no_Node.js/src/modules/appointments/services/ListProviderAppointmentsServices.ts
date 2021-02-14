import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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
    @inject('RgCacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<Appointment[]> {
    const cacheData = await this.cacheProvider.recover('teste');
    console.log(cacheData);

    const appontments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        month,
        year,
        day,
      },
    );
    // await this.cacheProvider.save('teste', 'valorteste');
    return appontments;
  }
}

export default ListProviderAppontmentsService;

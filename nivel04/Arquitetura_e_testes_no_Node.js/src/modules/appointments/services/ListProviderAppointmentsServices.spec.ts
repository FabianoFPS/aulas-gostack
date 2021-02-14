import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppontmentsService from './ListProviderAppointmentsServices';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppontments: ListProviderAppontmentsService;

describe('ListProviders Appointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppontments = new ListProviderAppontmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 1, 25, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 1, 25, 15, 0, 0),
    });

    const appointment = await listProviderAppontments.execute({
      provider_id: 'provider',
      year: 2021,
      month: 2,
      day: 25,
    });

    expect(appointment).toEqual([appointment1, appointment2]);
  });
});

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 0, 25, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 0, 25, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 25, 11).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 1,
      day: 25,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { availability: false, hour: 8 },
        { availability: false, hour: 9 },
        { availability: false, hour: 10 },
        { availability: false, hour: 11 },
        { availability: true, hour: 12 },
        { availability: true, hour: 13 },
        { availability: false, hour: 14 },
        { availability: false, hour: 15 },
        { availability: true, hour: 16 },
        { availability: true, hour: 17 },
      ]),
    );
  });
});

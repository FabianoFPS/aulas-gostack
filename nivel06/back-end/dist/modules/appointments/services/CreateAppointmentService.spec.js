"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeNotificationRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mock_user_id = 'fffffffffffffffffffffff';
const mock_provider_id = 'asdf465d4f6sa4df';
let fakeAppointmentsRepository;
let fakeNotificationRepository;
let fakeCacheProvider;
let createAppointment;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeNotificationRepository = new _FakeNotificationRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeNotificationRepository, fakeCacheProvider);
  });
  it('should de able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());
    const appointment = await createAppointment.execute({
      provider_id: mock_provider_id,
      user_id: mock_user_id,
      date: new Date(2020, 4, 10, 13)
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(mock_provider_id);
  });
  it('should not de able to create on the same time', async () => {
    const appointmentDate = new Date(3000, 4, 10, 13);
    await createAppointment.execute({
      date: appointmentDate,
      provider_id: mock_provider_id,
      user_id: mock_user_id
    });
    await expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: mock_provider_id,
      user_id: mock_user_id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('shout not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: 'abcdef',
      provider_id: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('shout not be able to create an appointment with same user provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());
    const idsUserAndProvider = '123asd';
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: idsUserAndProvider,
      provider_id: idsUserAndProvider
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('shout not be able to create an appointment before 8am after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      user_id: mock_user_id,
      provider_id: mock_provider_id
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 18),
      user_id: mock_user_id,
      provider_id: mock_provider_id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});
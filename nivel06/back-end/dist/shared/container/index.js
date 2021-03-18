"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

require("./providers");

var _UserRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserRepository"));

var _AppointmentsRepository = _interopRequireDefault(require("../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserTokensRepository"));

var _NotificationsRepository = _interopRequireDefault(require("../../modules/notifications/infra/typeorm/repositories/NotificationsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('RgAppointmentsRepository', _AppointmentsRepository.default);

_tsyringe.container.registerSingleton('RgUsersRepository', _UserRepository.default);

_tsyringe.container.registerSingleton('RgUsertokensRepository', _UserTokensRepository.default);

_tsyringe.container.registerSingleton('RgNotificationsRepository', _NotificationsRepository.default);
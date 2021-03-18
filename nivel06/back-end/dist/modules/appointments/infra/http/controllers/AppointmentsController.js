"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _CreateAppointmentService = _interopRequireDefault(require("../../../services/CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsController {
  async create(request, response) {
    const {
      provider_id,
      date
    } = request.body;
    const user_id = request.user.id;
    const parsedDate = (0, _dateFns.isDate)(date) ? date : (0, _dateFns.parseISO)(date);

    const createAppointment = _tsyringe.container.resolve(_CreateAppointmentService.default);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
      user_id
    });
    return response.json(appointment);
  }

}

exports.default = AppointmentsController;
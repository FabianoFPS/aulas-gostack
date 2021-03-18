"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _ListProviderAppointmentsServices = _interopRequireDefault(require("../../../services/ListProviderAppointmentsServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderAppointmentsController {
  async index(request, response) {
    const {
      day,
      month,
      year
    } = request.query;
    const provider_id = request.user.id;

    const listProviderAppointment = _tsyringe.container.resolve(_ListProviderAppointmentsServices.default);

    const appointments = await listProviderAppointment.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
      day: Number(day)
    });
    return response.json((0, _classTransformer.classToClass)(appointments));
  }

}

exports.default = ProviderAppointmentsController;
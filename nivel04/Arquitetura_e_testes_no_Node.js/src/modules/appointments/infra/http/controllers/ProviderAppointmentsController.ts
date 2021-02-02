import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppontmentsService from '@modules/appointments/services/ListProviderAppointmentsServices';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body;
    const provider_id = request.user.id;
    const listProviderAppointment = container.resolve(
      ListProviderAppontmentsService,
    );

    const appointments = await listProviderAppointment.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}

import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabiblityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabiblityController from '../controllers/ProviderDayAvailabilityController';

const providerRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabiblityController = new ProviderMonthAvailabiblityController();
const providerDayAvailabiblityController = new ProviderDayAvailabiblityController();

providerRouter.use(ensureAuthenticated);

providerRouter.get('/', providersController.index);
providerRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabiblityController.index,
);
providerRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabiblityController.index,
);

export default providerRouter;

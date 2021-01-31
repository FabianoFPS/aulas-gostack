/* eslint-disable camelcase */
import { Router } from 'express';

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
  providerMonthAvailabiblityController.index,
);
providerRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabiblityController.index,
);

export default providerRouter;

/* eslint-disable camelcase */
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providerRouter = Router();
const providersController = new ProvidersController();

providerRouter.use(ensureAuthenticated);

providerRouter.get('/', providersController.index);

export default providerRouter;

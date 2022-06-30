import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/express/middleware/ensureAuthenticated';

import { CreateUsersController } from '../controllers/CreateUsersController';
import { ListUsersController } from '../controllers/ListUsersController';

const usersRoutes = Router();

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  new CreateUsersController().handle
);

usersRoutes.get('/', ensureAuthenticated, new ListUsersController().handle);

export { usersRoutes };

import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

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
  new CreateUsersController().handle
);

usersRoutes.get('/', new ListUsersController().handle);

export { usersRoutes };

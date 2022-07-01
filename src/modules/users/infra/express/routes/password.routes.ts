import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ForgotPasswordController } from '../controllers/passwordControllers/ForgotPasswordController';
import { ResetPasswordController } from '../controllers/passwordControllers/ResetPasswordController';

const passwordRoutes = Router();

passwordRoutes.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  new ForgotPasswordController().handle
);

passwordRoutes.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  new ResetPasswordController().handle
);

export { passwordRoutes };

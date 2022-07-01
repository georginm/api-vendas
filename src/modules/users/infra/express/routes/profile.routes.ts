import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/express/middleware/ensureAuthenticated';

import { ShowProfileController } from '../controllers/profileControllers/ShowProfileController';
import { UpdateProfileController } from '../controllers/profileControllers/UpdateProfileController';

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().optional(),
      passwordConfirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
      oldPassword: Joi.string(),
    },
  }),
  new UpdateProfileController().handle
);

profileRouter.get('/', new ShowProfileController().handle);

export { profileRouter };

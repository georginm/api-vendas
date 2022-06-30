import upload from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import { ensureAuthenticated } from '@shared/infra/express/middleware/ensureAuthenticated';

import { UploadUserAvatarController } from '../controllers/avatarControllers/UploadUserAvatarController';
import { CreateUsersController } from '../controllers/usersControllers/CreateUsersController';
import { ListUsersController } from '../controllers/usersControllers/ListUsersController';

const usersRoutes = Router();

const uploadAvatar = multer(upload);

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

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  new UploadUserAvatarController().handle
);

export { usersRoutes };

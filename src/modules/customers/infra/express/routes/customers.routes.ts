import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/express/middleware/ensureAuthenticated';

import { CreateCustomerController } from '../controllers/customersControllers/CreateCustomerController';
import { DeleteCustomerController } from '../controllers/customersControllers/DeleteCustomerController';
import { ListCustomersController } from '../controllers/customersControllers/ListCustomerController';
import { ShowCustomerController } from '../controllers/customersControllers/ShowCustomerController';
import { UpdateCustomerController } from '../controllers/customersControllers/UpdateCustomerController';

const customersRoutes = Router();

customersRoutes.use(ensureAuthenticated);

customersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  new CreateCustomerController().handle
);

customersRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  new DeleteCustomerController().handle
);

customersRoutes.get('/', new ListCustomersController().handle);

customersRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  new ShowCustomerController().handle
);

customersRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  new UpdateCustomerController().handle
);

export { customersRoutes };

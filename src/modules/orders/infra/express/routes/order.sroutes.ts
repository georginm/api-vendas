import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { CreateOrderController } from '../controllers/CreateOrderController';
import { ShowOrderController } from '../controllers/ShowOrderController';

const ordersRoutes = Router();

ordersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  new CreateOrderController().handle
);

ordersRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  new ShowOrderController().handle
);

export { ordersRoutes };

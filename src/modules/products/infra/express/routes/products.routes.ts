import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { CreateProductController } from '../controllers/productControllers/CreateProductController';
import { DeleteProductController } from '../controllers/productControllers/DeleteProductController';
import { ListProductController } from '../controllers/productControllers/ListProductController';
import { ShowProductController } from '../controllers/productControllers/ShowProductController';
import { UpdateProductController } from '../controllers/productControllers/UpdateProductController';

const productRoutes = Router();

productRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  new CreateProductController().handle
);

productRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  new DeleteProductController().handle
);

productRoutes.get('/', new ListProductController().handle);

productRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  new ShowProductController().handle
);

productRoutes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  new UpdateProductController().handle
);

export { productRoutes };

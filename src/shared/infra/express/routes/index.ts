import { productRoutes } from '@modules/products/infra/express/routes/productRoute';
import { usersRoutes } from '@modules/users/infra/express/routes/users.routes';
import { Router } from 'express';

const router = Router();

router.use('/products', productRoutes);
router.use('/users', usersRoutes);

export { router };

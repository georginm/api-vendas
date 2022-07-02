import { customersRoutes } from '@modules/customers/infra/express/routes/customers.routes';
import { ordersRoutes } from '@modules/orders/infra/express/routes/orders.routes';
import { productRoutes } from '@modules/products/infra/express/routes/products.routes';
import { passwordRoutes } from '@modules/users/infra/express/routes/password.routes';
import { profileRouter } from '@modules/users/infra/express/routes/profile.routes';
import { sessionRoutes } from '@modules/users/infra/express/routes/sessions.routes';
import { usersRoutes } from '@modules/users/infra/express/routes/users.routes';
import { Router } from 'express';

const router = Router();

router.use('/products', productRoutes);
router.use('/users', usersRoutes);
router.use('/sessions', sessionRoutes);
router.use('/password', passwordRoutes);
router.use('/profile', profileRouter);
router.use('/customers', customersRoutes);
router.use('/orders', ordersRoutes);

export { router };

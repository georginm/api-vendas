import { productRoutes } from '@modules/products/infra/express/routes/productRoute';
import { Router } from 'express';

const router = Router();

router.use('/products', productRoutes);

export { router };

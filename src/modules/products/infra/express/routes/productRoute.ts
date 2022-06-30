import { Router } from 'express';

import { CreateProductController } from '../controllers/productControllers/CreateProductController';
import { DeleteProductController } from '../controllers/productControllers/DeleteProductController';
import { ListProductController } from '../controllers/productControllers/ListProductController';
import { ShowProductController } from '../controllers/productControllers/ShowProductController';
import { UpdateProductController } from '../controllers/productControllers/UpdateProductController';

const productRoutes = Router();

productRoutes.post('/', new CreateProductController().handle);
productRoutes.delete('/:id', new DeleteProductController().handle);
productRoutes.get('/', new ListProductController().handle);
productRoutes.get('/:id', new ShowProductController().handle);
productRoutes.put('/:id', new UpdateProductController().handle);

export { productRoutes };

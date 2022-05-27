import { Router } from 'express';

import { CreateProductController } from '../controllers/CreateProductController';
import { DeleteProductController } from '../controllers/DeleteProductController';
import { ListProductController } from '../controllers/ListProductController';
import { ShowProductController } from '../controllers/ShowProductController';
import { UpdateProductController } from '../controllers/UpdateProductController';

const productRoutes = Router();

const createProductController = new CreateProductController();
const deleteProductController = new DeleteProductController();
const listProductController = new ListProductController();
const showProductController = new ShowProductController();
const updateProductController = new UpdateProductController();

productRoutes.post('/', createProductController.handle);
productRoutes.delete('/:id', deleteProductController.handle);
productRoutes.get('/', listProductController.handle);
productRoutes.get('/:id', showProductController.handle);
productRoutes.put('/:id', updateProductController.handle);

export { productRoutes };

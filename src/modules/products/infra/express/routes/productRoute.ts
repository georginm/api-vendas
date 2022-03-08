import { Router } from 'express';

import { CreateProductController } from '../controllers/createProductController/CreateProductController';
import { DeleteProductController } from '../controllers/deleteProductController/DeleteProductController';
import { ListProductController } from '../controllers/listProductController/ListProductController';
import { ShowProductController } from '../controllers/showProductController/ShowProductController';
import { UpdateProductController } from '../controllers/updateProductController/UpdateProductController';

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

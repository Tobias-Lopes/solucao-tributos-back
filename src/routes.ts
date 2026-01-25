
import { Router } from 'express';
import SalesController from './controllers/SalesController';
import CategoryController from './controllers/CategoryController';

const routes = Router();

routes.get('/relatorio', SalesController.index);
routes.post('/vendas', SalesController.store);
routes.delete('/vendas/:id', SalesController.delete);

routes.get('/categorias', CategoryController.index);
routes.post('/categorias', CategoryController.store);
routes.delete('/categorias/:id', CategoryController.delete);

export default routes;

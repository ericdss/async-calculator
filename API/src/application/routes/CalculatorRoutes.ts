import { Router } from 'express';
import { CalculatorControler } from '../controllers';
import { Authorize } from '../middlewares/AuthMiddleware';

const routes = Router();

routes.get('/calc-async/:id', Authorize, CalculatorControler.getResult);
routes.post('/calc-async/sum', Authorize, CalculatorControler.sum);

export default routes;
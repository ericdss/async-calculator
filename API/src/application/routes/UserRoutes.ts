import { Router } from 'express';
import { UsersControler } from '../controllers';

const routes = Router();

routes.post('/login', UsersControler.login);
routes.post('/register', UsersControler.register);

export default routes;
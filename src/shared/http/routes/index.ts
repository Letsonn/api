import userRouter from '@modules/users/routes/products.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', userRouter);

export default routes;

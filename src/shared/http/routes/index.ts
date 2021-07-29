import userRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);


export default routes;

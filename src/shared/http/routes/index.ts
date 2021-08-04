import userRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import { Router } from 'express';
import projectsRouter from '@modules/projects/routes/projects.routes';
import boardsRouter from '@modules/boards/routes/boards.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/projects', projectsRouter);
routes.use('/boards', boardsRouter);


export default routes;

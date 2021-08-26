import userRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import { Router } from 'express';
import projectsRouter from '@modules/projects/routes/projects.routes';
import boardsRouter from '@modules/boards/routes/boards.routes';
import activityRouter from '@modules/activities/routes/acitivities.routes';
import employmentsRouter from '@modules/employments/routes/employments.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/projects', projectsRouter);
routes.use('/boards', boardsRouter);
routes.use('/acitivities', activityRouter);
routes.use('/employments', employmentsRouter);


export default routes;

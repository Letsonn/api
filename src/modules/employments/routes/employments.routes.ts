import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import EmploymentsController from '../controllers/EmploymentsController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const employmentsRouter = Router();
const employmentsController = new EmploymentsController();

employmentsRouter.get('/:employmentId', isAuthenticated, employmentsController.listOne);
employmentsRouter.post('/', isAuthenticated, employmentsController.create);
employmentsRouter.patch('/:employmentId', isAuthenticated, employmentsController.update);
employmentsRouter.delete('/:employmentId', isAuthenticated, employmentsController.delete);

export default employmentsRouter;

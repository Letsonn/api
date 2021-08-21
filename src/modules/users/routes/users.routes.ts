import { Router } from 'express';
import UserController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', isAuthenticated, userController.listAllUsers);

userRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      authenticationToken: Joi.string().allow(null),
    }
  }),
  userController.create
);

userRouter.put('/:id', isAuthenticated, userController.update);

userRouter.get('/:userId', isAuthenticated, userController.list);



export default userRouter;

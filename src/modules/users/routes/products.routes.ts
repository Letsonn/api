import { Router } from 'express';
import UserController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.list)

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
  userController.create);


export default userRouter;

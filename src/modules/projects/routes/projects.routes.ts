import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ProjectsController from "../controllers/ProjectsController";

const projectsRouter = Router();
const projectController = new ProjectsController();

projectsRouter.get('/:userId', isAuthenticated, celebrate({
  [Segments.PARAMS]: {
    userId: Joi.string().required(),
  },
}),
  projectController.list
);

projectsRouter.post('/', isAuthenticated, celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  }
}),
  projectController.create
);

export default projectsRouter;

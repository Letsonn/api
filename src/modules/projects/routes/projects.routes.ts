import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ProjectsController from "../controllers/ProjectsController";

const projectsRouter = Router();
const projectController = new ProjectsController();

projectsRouter.post('/', isAuthenticated, celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  }
}),
  projectController.create
);

export default projectsRouter;

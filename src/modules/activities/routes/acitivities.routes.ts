import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import ActivityController from "../controller/acitivityController";

const activityRouter = Router();
const activityController = new ActivityController();

activityRouter.post('/', isAuthenticated, celebrate({
  [Segments.BODY]: {
    status: Joi.string().required(),
    description: Joi.string().required(),
    employmentId: Joi.string().required(),
    boardId: Joi.string().required()
  }
}),
  activityController.create
);

activityRouter.get('/:activityId', isAuthenticated, activityController.list);
activityRouter.put('/:activityId', isAuthenticated, activityController.update);
activityRouter.delete('/:activityId', isAuthenticated, activityController.delete);
activityRouter.get('/:boardId/board', isAuthenticated, activityController.listActivitiesFromBoard);

export default activityRouter;

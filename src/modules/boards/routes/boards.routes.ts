import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import BoardsController from "../controllers/BoardsController";

const boardsRouter = Router();
const boardController = new BoardsController();

boardsRouter.get('/:projectId', isAuthenticated, boardController.listBoardFromPorjectId);
boardsRouter.patch('/:boardId', isAuthenticated, boardController.updateBoard);

boardsRouter.post('/', isAuthenticated, celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    projectId: Joi.string().required(),
  }
}),
  boardController.create
);

export default boardsRouter;

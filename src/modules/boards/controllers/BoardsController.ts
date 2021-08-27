import { Request, Response } from "express";
import jwtDecode from "jwt-decode";
import CreateBoardService from "../services/createBoardService";
import ListBoardsService from "../services/listBoardsService";

interface IToken {
  id: string;
  name: string;
  email: string;
}

export default class BoardsController {
  public async listBoardFromPorjectId(request: Request, response: Response): Promise<Response> {
    const { projectId } = request.params;

    const listBoards = new ListBoardsService();

    const boards = await listBoards.execute({
      projectId,
    });

    return response.json(boards);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, projectId } = request.body;
    const jwtToken = request.headers.authorization?.split(' ')[1] || '';

    const decodedToken: IToken = jwtDecode(jwtToken);

    const createBoard = new CreateBoardService();

    const project = await createBoard.execute({
      name,
      projectId
    });

    response.status(201);
    return response.json(project);
  }
}

import { Request, Response } from "express";
import jwtDecode from "jwt-decode";
import CreateBoardService from "../services/createBoardService";
import DeleteBoardService from "../services/deleteBoardService";
import ListBoard from "../services/listBoard";
import ListBoardsService from "../services/listBoardsService";
import UpdateBoardService from "../services/updateBoardService";

interface IToken {
  id: string;
  name: string;
  email: string;
}

export default class BoardsController {
  public async listBoard(request: Request, response: Response): Promise<Response> {
    const { boardId } = request.params;

    const listBoard = new ListBoard();

    const board = await listBoard.execute({
      boardId
    });

    return response.json(board);
  }

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

  public async updateBoard(request: Request, response: Response): Promise<Response> {
    const { boardId } = request.params;
    const { name } = request.body;

    const updateBoard = new UpdateBoardService();

    const board = await updateBoard.execute({
      id: boardId,
      name,
    });

    return response.json(board);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { boardId } = request.params;

    const deleteBoard = new DeleteBoardService();

    const board = await deleteBoard.execute({
      id: boardId,
    });

    return response.json(board);
  }
}

import { Request, Response } from "express";
import jwtDecode from "jwt-decode";
import CreateBoardService from "../services/createBoardService";

interface IToken {
  id: string;
  name: string;
  email: string;
}

export default class BoardsController {
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

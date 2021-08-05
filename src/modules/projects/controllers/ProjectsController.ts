import { Request, Response } from "express";
import jwtDecode from "jwt-decode";
import CreateProjectService from "../services/createProjectService";

interface IToken {
  id: string;
  name: string;
  email: string;
}

export default class ProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const jwtToken = request.headers.authorization?.split(' ')[1] || '';

    const decodedToken: IToken = jwtDecode(jwtToken);

    const createProject = new CreateProjectService();

    const project = await createProject.execute({
      name,
      userId: decodedToken.id
    });

    response.status(201);
    return response.json(project);
  }
}
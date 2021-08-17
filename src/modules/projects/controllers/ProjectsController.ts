import { Request, Response } from "express";
import jwtDecode from "jwt-decode";
import CreateProjectService from "../services/createProjectService";
import DeleteProjectService from "../services/deleteProject";
import ListProjectsFromUserService from "../services/listProjectsFromUserService";
import UpdateProjectService from "../services/updateProjectService";

interface IToken {
  id: string;
  name: string;
  email: string;
}

export default class ProjectsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { projectId } = request.params;
    const { name } = request.body;

    const updateProject = new UpdateProjectService();

    const project = await updateProject.execute({
      id: projectId,
      name,
    });
    console.log(project);

    return response.json(project);
  }

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

  public async list(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const listProjects = new ListProjectsFromUserService();

    const projects = await listProjects.execute({
      userId
    });

    return response.json(projects)
  }

  public async delete(request: Request, response: Response) {
    const { projectId } = request.body;

    const deleteProject = new DeleteProjectService();

    const deletedProject = await deleteProject.execute(projectId);

    return response.json(deletedProject);
  }
}

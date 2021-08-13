import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Project from "../typeorm/entities/projects";
import { ProjectRepository } from "../typeorm/repositories/projectRepository";

interface IRequest {
  id: string;
  name: string;
}

class UpdateProjectService {
  public async execute({ id, name }: IRequest): Promise<Project> {
    const projectRepository = getCustomRepository(ProjectRepository);

    const project = await projectRepository.findOne(id);

    if (!project) {
      throw new AppError('Projects does not exist', 404);
    }

    project.name = name;

    await projectRepository.save(project);

    return project;
  }
}

export default UpdateProjectService;

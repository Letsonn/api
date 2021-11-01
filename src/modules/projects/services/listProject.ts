import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Projects from "../typeorm/entities/projects";
import { ProjectRepository } from "../typeorm/repositories/projectRepository";

interface IRequest {
  id: string;
}

class ListProject {
  public async execute({ id }: IRequest): Promise<Projects> {
    const projectRepository = getCustomRepository(ProjectRepository);

    const project = await projectRepository.findOne(id);

    if (!project) {
      throw new AppError('Project does not exist');
    }

    return project;
  }
}

export default ListProject;

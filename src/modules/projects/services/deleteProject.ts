import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Projects from "../typeorm/entities/projects";
import { ProjectRepository } from "../typeorm/repositories/projectRepository";

interface IRequest {
  id: string;
}

class DeleteProjectService {
  public async execute({ id }: IRequest): Promise<Projects> {
    const projectRepository = getCustomRepository(ProjectRepository);

    const project = await projectRepository.findOne(id);

    if (!project) {
      throw new AppError('Project does not exist', 404);
    }

    const deletedProject = await projectRepository.remove(project);

    console.log(deletedProject);

    return project
  }
}


export default DeleteProjectService;

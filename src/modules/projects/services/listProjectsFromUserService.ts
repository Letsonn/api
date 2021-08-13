import { getCustomRepository } from "typeorm";
import Projects from "../typeorm/entities/projects";
import { ProjectRepository } from "../typeorm/repositories/projectRepository";

interface IRequest {
  userId: string;
}

class ListProjectsFromUserService {
  public async execute({ userId }: IRequest): Promise<Projects[]> {
    const projectRepository = getCustomRepository(ProjectRepository);

    const projects = await projectRepository.findProjectsByUserId(userId);

    return projects;
  }
}

export default ListProjectsFromUserService;

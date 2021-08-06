import CreateEmploymentService from "@modules/employments/services/createEmploymentService";
import { Role } from "@modules/employments/typeorm/enum/employmentEnum";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Project from "../typeorm/entities/projects";
import { ProjectRepository } from "../typeorm/repositories/projectRepository";

interface IRequest {
  name: string;
  userId: string;
}

class CreateProjectService {
  public async execute({ name, userId }: IRequest): Promise<Project> {
    try {
      const projectRepository = getCustomRepository(ProjectRepository);

      const project = projectRepository.create({
        name,
      });

      await projectRepository.save(project);

      const createEmployment = new CreateEmploymentService();

      await createEmployment.execute({ role: Role.manager, project: project.id, user: userId });

      return project;
    } catch (err) {
      console.log(err);
      throw new AppError('Fail to create project.')
    }
  }
}


export default CreateProjectService;

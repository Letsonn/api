import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Employments from "../typeorm/entities/empĺoyment";
import { Role } from "../typeorm/enum/employmentEnum";
import { EmploymentsRepository } from "../typeorm/repositories/employmentsRepository";

interface IRequest {
  role: Role,
  user: string,
  project: string,
}

class CreateEmploymentService {
  public async execute({ role, project, user }: IRequest): Promise<Employments> {
    const employmentRepository = getCustomRepository(EmploymentsRepository);
    const employmentExists = await employmentRepository.findByProjectsIdAndUserId(project, user);

    if (employmentExists) {
      throw new AppError('Employment alredy exists');
    }

    const employment = employmentRepository.create({
      role,
      projectId: project,
      userId: user
    });

    await employmentRepository.save(employment);

    return employment;

  }
}

export default CreateEmploymentService;

import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Employments from "../typeorm/entities/empĺoyment";
import { Role } from "../typeorm/enum/employmentEnum";
import { EmploymentsRepository } from "../typeorm/repositories/userRepository";

interface IRequest {
  role: Role,
  user: string,
  project: string,
}

class CreateEmploymentService {
  public async execute({ role, project, user }: IRequest): Promise<Employments> {
    const employmentRepository = getCustomRepository(EmploymentsRepository);
    const employmentExists = await employmentRepository.findByProjectIdAndUserId(project, user);

    if (employmentExists) {
      throw new AppError('Employment alredy exists');
    }

    const employment = new Employments();

    employment.role = role;
    employment.project = project;
    employment.user = user;

    await employmentRepository.save(employment);

    return employment;

  }
}

export default CreateEmploymentService;

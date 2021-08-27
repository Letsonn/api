import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Employments from "../typeorm/entities/empĺoyment";
import { Role } from "../typeorm/enum/employmentEnum";
import { EmploymentsRepository } from "../typeorm/repositories/employmentsRepository";

interface IRequest {
  id: string;
  role: Role;
}

class UpdateEmploymentService {
  public async execute({ id, role }: IRequest): Promise<Employments> {
    const employmentRepository = getCustomRepository(EmploymentsRepository);

    const employment = await employmentRepository.findOne(id);

    if (!employment) {
      throw new AppError('Employment does not exists');
    }

    employment.role = role;

    const updatedEmployment = await employmentRepository.save(employment);

    return updatedEmployment;
  }
}

export default UpdateEmploymentService;

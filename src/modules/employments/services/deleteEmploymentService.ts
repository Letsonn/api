import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Employments from "../typeorm/entities/empĺoyment";
import { EmploymentsRepository } from "../typeorm/repositories/employmentsRepository";

interface IRequest {
  id: string;
}

class DeleteEmploymentService {
  public async execute({ id }: IRequest): Promise<Employments> {
    const employmentRepository = getCustomRepository(EmploymentsRepository);
    const employment = await employmentRepository.findOne(id);

    if (!employment) {
      throw new AppError('Employment does not exist');
    }

    const deletedEmployment = await employmentRepository.remove(employment);

    return deletedEmployment;
  }
}

export default DeleteEmploymentService;

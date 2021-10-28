import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Employments from "../typeorm/entities/empĺoyment";
import { EmploymentsRepository } from "../typeorm/repositories/employmentsRepository";

interface IRequest {
  projectId: string;
}

class ListEmploymentsProjectService {
  public async execute({ projectId }: IRequest): Promise<Employments[]> {
    const employmentRepository = getCustomRepository(EmploymentsRepository);

    const employments = await employmentRepository.listEmploymentsProject(projectId);

    if (!employments) {
      throw new AppError('Employments not found');
    }

    return employments;
  }
}

export default ListEmploymentsProjectService;

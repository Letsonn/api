import { Request, Response } from 'express';
import CreateEmploymentService from '../services/createEmploymentService';
import ListEmploymentService from '../services/listEmploymentService';
import UpdateEmploymentService from '../services/updateEmploymentService';


export default class EmploymentsController {
  public async listOne(request: Request, response: Response): Promise<Response> {
    const { employmentId } = request.params;

    const listEmploymentService = new ListEmploymentService();

    const employment = await listEmploymentService.execute({
      id: employmentId,
    });

    return response.json(employment);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { role, user, project } = request.body;

    const createEmployment = new CreateEmploymentService();

    const employment = await createEmployment.execute({
      role,
      project,
      user
    });

    return response.json(employment);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { role } = request.body;
    const { employmentId } = request.params;

    const updateEmployment = new UpdateEmploymentService();

    const employment = await updateEmployment.execute({
      id: employmentId,
      role,
    });

    return response.json(employment);
  }
}

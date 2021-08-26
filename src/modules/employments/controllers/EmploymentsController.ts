import { Request, Response } from 'express';
import CreateEmploymentService from '../services/createEmploymentService';


export default class EmploymentsController {
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
}

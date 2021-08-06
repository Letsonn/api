import { Request, Response } from "express";
import CreateActivityService from "../services/createActivity";

export default class ActivityController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { status, description, employmentId, boardId } = request.body;
    console.log(status, description, employmentId, boardId);
    const createActivity = new CreateActivityService();

    const activity = await createActivity.execute({
      status,
      description,
      employmentId,
      boardId
    });

    console.log(activity);

    response.status(201);
    return response.json(activity);
  }
}

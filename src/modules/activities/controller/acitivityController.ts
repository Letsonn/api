import { Request, Response } from "express";
import CreateActivityService from "../services/createActivityService";
import ListActivityService from "../services/listActivityService";

export default class ActivityController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { status, description, employmentId, boardId } = request.body;
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

  public async list(request: Request, response: Response): Promise<Response> {
    const { activityId } = request.params;

    const listActivity = new ListActivityService();

    const activity = await listActivity.execute({
      id: activityId
    });

    return response.json(activity);
  }
}

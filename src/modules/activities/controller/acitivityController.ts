import { Request, Response } from "express";
import CreateActivityService from "../services/createActivityService";
import DeleteActivityService from "../services/deleteActivityService";
import ListActivitiesFromBoard from "../services/listActivitiesBoard";
import ListActivityService from "../services/listActivityService";
import UpdateActivityService from "../services/updateActivityService";

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { description, status, employmentId, boardId } = request.body;

    const updateActivity = new UpdateActivityService();
    const activity = await updateActivity.execute({
      id,
      description,
      status,
      employmentId,
      boardId
    });

    return response.json(activity);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteActivity = new DeleteActivityService();
    const deletedActivity = await deleteActivity.execute({
      id,
    });

    return response.json(deletedActivity);
  }

  public async listActivitiesFromBoard(request: Request, response: Response): Promise<Response> {
    const { boardId } = request.params;

    const listActivities = new ListActivitiesFromBoard();
    const getActivities = await listActivities.execute({
      boardId
    });
    console.log(getActivities);

    return response.json(getActivities);
  }
}

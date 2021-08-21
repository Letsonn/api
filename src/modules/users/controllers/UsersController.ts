import { Request, Response } from 'express';
import CreateUserService from '../services/createUserService';
import ListUserService from '../services/listUserService';
import ListUsersService from '../services/listUsersService';
import UpdateUserService from '../services/updateUserService';

export default class UserController {
  public async listAllUsers(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUsersService();

    const users = await listUser.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { firstName, lastName, email, password, authenticationToken } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      firstName,
      lastName,
      email,
      password,
      authenticationToken
    });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { firstName, lastName } = request.body;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      id,
      firstName,
      lastName,
    });

    return response.json(user);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const listUser = new ListUserService();

    const user = await listUser.execute({ userId });

    return response.json(user);
  }


}

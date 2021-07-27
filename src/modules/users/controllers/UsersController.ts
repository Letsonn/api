import { Request, Response } from 'express';
import CreateUserService from '../services/createUserService';
import ListUserService from '../services/listUserService';

export default class UserController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();

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
}

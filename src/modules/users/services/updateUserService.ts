import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/userRepository";

interface IRequest {
  id: string;
  firstName: string;
  lastName: string;
}

class UpdateUserService {
  public async execute({ id, firstName, lastName }: IRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('User does not exist', 404);
    }

    user.firstName = firstName;
    user.lastName = lastName;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;

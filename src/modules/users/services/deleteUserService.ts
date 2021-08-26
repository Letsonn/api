import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Users from "../typeorm/entities/user";
import { UserRepository } from "../typeorm/repositories/userRepository";

interface IRequest {
  userId: string;
}

class DeleteUserService {
  public async execute({ userId }: IRequest): Promise<Users> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new AppError('User does not exists', 404);
    }

    const deletedProject = await userRepository.remove(user);

    return deletedProject;
  }
}

export default DeleteUserService;

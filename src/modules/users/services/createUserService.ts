import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/user";
import { UserRepository } from "../typeorm/repositories/userRepository";
import { hash } from 'bcryptjs';

interface IRequest {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  authenticationToken: string,
}

class CreateUserService {
  public async execute({ firstName, lastName, email, password, authenticationToken }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const userExists = await usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('There is alredy one user with this email', 409);
    }

    const hashPassword = await hash(password, 8);

    const user = usersRepository.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      authenticationToken
    });

    await usersRepository.save(user);

    return user
  }
}

export default CreateUserService;

import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/user";
import { UserRepository } from "../typeorm/repositories/userRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = sign(
      {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
      `${auth.jwt.secret}`,
      {
        subject: user.id,
        expiresIn: `${auth.jwt.expiresIn}`,
      });

    user.authenticationToken = token;

    await userRepository.save(user);

    return { user }
  }
}

export default CreateSessionsService;

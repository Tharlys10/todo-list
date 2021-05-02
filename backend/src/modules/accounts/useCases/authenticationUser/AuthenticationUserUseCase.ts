import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import auth from "@config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string,
  }
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticationUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const { secret_token, expires_in_token } = auth;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({ email: user.email }, secret_token, {
      subject: String(user.id),
      expiresIn: expires_in_token
    });

    const session: IResponse = {
      token,
      refresh_token: "",
      user: {
        name: user.name,
        email: user.email,
      }
    }

    return session;
  }
}

export { AuthenticationUserUseCase }
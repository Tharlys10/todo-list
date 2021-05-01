import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = []

  async create({ id, name, email, password, avatar }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id,
      name,
      email,
      password,
      avatar
    });

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

}

export { UsersRepositoryInMemory }
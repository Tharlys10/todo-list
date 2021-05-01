import { container } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

// IUsersRepository
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
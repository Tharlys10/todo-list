import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticationUserUseCase } from "./AuthenticationUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticationUserUseCase: AuthenticationUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authentication User", () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticationUserUseCase = new AuthenticationUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able authentication a user", async () => {
    await createUserUseCase.execute({
      name: "User test",
      email: "usertest@test.com.br",
      password: "12345678"
    });

    const session = await authenticationUserUseCase.execute({
      email: "usertest@test.com.br",
      password: "12345678"
    });

    expect(session).toHaveProperty("token");
  });

  it("should be able not location a user", async () => {
    await expect(
      authenticationUserUseCase.execute({
        email: "usernotfould@test.com",
        password: "12345678"
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });

  it("should be able identification a password incorrect", async () => {
    await createUserUseCase.execute({
      name: "User test",
      email: "usertestpassowrd@test.com",
      password: "12345678"
    });

    await expect(
      authenticationUserUseCase.execute({
        email: "usertestpassowrd@test.com",
        password: "87654321"
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });
})
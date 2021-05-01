import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create User", () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able a create new user", async () => {
    const user = await createUserUseCase.execute({
      name: "Test new user",
      email: "test@test.com",
      password: "12345678"
    });

    expect(user).toHaveProperty("id");
  });

  it("should be able to locate an existing user", async () => {
    await usersRepositoryInMemory.create({
      name: "Test user already exists",
      email: "test@test.com",
      password: "12345678"
    });

    await expect(
      createUserUseCase.execute({
        name: "Test new user",
        email: "test@test.com",
        password: "87654321"
      })
    ).rejects.toEqual(new AppError("User already exists"))
  })
})
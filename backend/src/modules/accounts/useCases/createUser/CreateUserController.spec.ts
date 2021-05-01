import request from "supertest";

import { app } from "@shared/infra/http/app";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

let connection: Connection;

describe("Create User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able a create new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Test new user",
        email: "usertest@test.com",
        password: "12345678"
      })

    expect(response.status).toBe(201);
  });

  it("should be able to locate an existing user", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Test new user",
        email: "usertest@test.com",
        password: "12345678"
      })

    expect(response.status).toBe(400);
  });
})
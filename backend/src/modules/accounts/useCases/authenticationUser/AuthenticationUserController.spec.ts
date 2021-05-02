import request from "supertest";
import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

let connection: Connection;

describe("Authentication User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuid();
    const password = await hash("12345678", 8);

    await connection.query(
      `INSERT INTO users 
        (id, name, email, password, created_at, updated_at) 
        VALUES
        ('${id}', 'User Test Todo List', 'usertest@todolist.com', '${password}', 'now()', 'now()')
      `
    );
  })

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it("should be able authentication a user", async () => {
    const response = await request(app)
      .post("/session")
      .send({
        email: "usertest@todolist.com",
        password: "12345678"
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user.email).toEqual("usertest@todolist.com");
  });

})
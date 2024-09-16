import request from "supertest";
import app from "../src/app";
import { sequelize } from "../src/models";

describe("User Endpoints", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  let token: string;

  it("should register a new user", async () => {
    const res = await request(app).post("/api/user/register").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toHaveProperty("user");
    expect(res.body.data.user).toHaveProperty("id");
    expect(res.body.data.user).toHaveProperty("email", "testuser@example.com");
  });

  it("should login the user", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toHaveProperty("token");
    expect(res.body.data).toHaveProperty("user");

    token = res.body.data.token;
  });

  it("should get the user profile data", async () => {
    const res = await request(app)
      .get("/api/user/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toHaveProperty("user");
    expect(res.body.data.user).toHaveProperty("email", "testuser@example.com");
    expect(res.body.data).toHaveProperty("telegramData");
  });
});

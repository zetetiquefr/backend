import UserMock from "./user.mock";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { UserFilterDto } from "./dto/getUser.filter.dto";
import { INestApplication } from "@nestjs/common";

describe("UserRoutes", () => {
  let userController: UserController;
  let userService: UserService;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: UserMock.userMock,
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe("POST /user", () => {
    it("should be empty", async () => {
      UserMock.userMock.reset();

      const users = await userService.getUsers({} as UserFilterDto);

      expect(users).toEqual([]);
    });

    it("should return 201, created when user is created", async () => {
      return request(app.getHttpServer())
        .post("/user")
        .send(UserMock.postUser)
        .expect(201)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body.password).toBeDefined();
          expect(res.body.password === UserMock.postUser.password).toBeFalsy();
          expect(res.body.name).toEqual(UserMock.postUser.name);
          expect(res.body.email).toEqual(UserMock.postUser.email);
          expect(res.body.uuid).toBeDefined();
          expect(res.body.archived).toBeFalsy();
        });
    });

    it("should return 400, bad request when user is not created", async () => {
      return request(app.getHttpServer())
        .post("/user")
        .send(UserMock.postUser)
        .expect(400);
    });
  });

  describe("GET /user", () => {
    it("should return an empty array of users", async () => {
      UserMock.userMock.reset();

      return request(app.getHttpServer())
        .get("/user")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body.data).toEqual([]);
        });
    });

    it("Create a user", async () => {
      UserMock.getRouteUsers.map(async (user) => {
        await userService.createUser(user);
      });
    });

    it("should return an array of users", async () => {
      return request(app.getHttpServer())
        .get("/user")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body.data.length).toEqual(UserMock.getRouteUsers.length);
        });
    });

    it("should be paged", async () => {
      const page_size = 5;
      const page = 1;

      return request(app.getHttpServer())
        .get("/user")
        .query({ page: page, page_size: page_size })
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body.data.length).toEqual(page_size);
        });
    });
  });

  describe("GET /user/:uuid", () => {
    let user: User;

    it("Create a user", async () => {
      user = await userController.createUser(UserMock.getUserUuid);
    });

    it("should return a user", async () => {
      return request(app.getHttpServer())
        .get(`/user/${user.uuid}`)
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body.name).toEqual(user.name);
        });
    });

    it("should return 404, not found when user is not found", async () => {
      return request(app.getHttpServer()).get("/user/1234567890").expect(404);
    });
  }); 
});

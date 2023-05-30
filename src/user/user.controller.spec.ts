import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./user.entity";
import UserMock from "./user.mock";
import { UserFilterDto } from "./dto/getUser.filter.dto";

describe("UserController", () => {
  let userController: UserController;
  let userService: UserService;

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
  });

  describe("create", () => {
    const user: User = UserMock.createdUser1;
    let createdUser: User = undefined;

    it("should return a user", async () => {
      createdUser = await userController.createUser({ ...user });
      expect(createdUser).toBeDefined();
    });

    it("Must have an encrypted password", async () => {
      expect(createdUser.password === user.password).toBeFalsy();
    });

    it("Must have the same name", async () => {
      expect(createdUser.name).toEqual(user.name);
    });

    it("Must have the same email", async () => {
      expect(createdUser.email).toEqual(user.email);
    });

    it("Must have an uuid", async () => {
      expect(createdUser.uuid).toBeDefined();
    });

    it("Must not be archived", async () => {
      expect(createdUser.archived).toBeFalsy();
    });
  });

  describe("findAll", () => {
    it("should return an empty array of users", async () => {
      UserMock.userMock.reset();

      const res = await userController.getUser({} as UserFilterDto, 1, 10);

      expect(res).toBeDefined();
      expect(res.data).toBeDefined();
      expect(res.data).toEqual([]);
      expect(res.paging).toBeDefined();
      expect(res.paging).toEqual({
        page: 1,
        pageSize: 10,
        fetched: 0,
        total: 0,
      });
    });

    it("should return an user", async () => {
      const user: User = UserMock.findAllUserFirstCreated;

      await userController.createUser({ ...user });

      const res = await userController.getUser({} as UserFilterDto, 1, 10);

      expect(res).toBeDefined();
      expect(res.data).toBeDefined();
      expect(res.data.length).toBeGreaterThan(0);
      expect(res.paging).toBeDefined();
      expect(res.paging).toEqual({
        page: 1,
        pageSize: 10,
        fetched: 1,
        total: 1,
      });

      const userRes = res.data[0];

      expect(userRes.name).toEqual(user.name);
    });

    it("should return all users", async () => {
      UserMock.findAllCreatedUser.map(async (user) => {
        await userController.createUser({ ...user });
      });
    });

    it("should return all users", async () => {
      const res = await userController.getUser({} as UserFilterDto, 1, 10);

      expect(res).toBeDefined();
      expect(res.data).toBeDefined();
      expect(res.data.length).toEqual(UserMock.findAllAllUsers.length);
      expect(res.paging).toBeDefined();
      expect(res.paging).toEqual({
        page: 1,
        pageSize: 10,
        fetched: UserMock.findAllAllUsers.length,
        total: UserMock.findAllAllUsers.length,
      });

      res.data.map((user) => {
        const foundUser: User = UserMock.findAllAllUsers.find(
          (userMock) => userMock.name === user.name
        );

        expect(foundUser).toBeDefined();
      });
    });

    it("Should be pagined max", async () => {
      const res = await userController.getUser(
        {} as UserFilterDto,
        1,
        20 // Too big
      );

      expect(res).toBeDefined();
      expect(res.data).toBeDefined();
      expect(res.data.length).toEqual(UserMock.findAllAllUsers.length);
      expect(res.paging).toBeDefined();
      expect(res.paging).toEqual({
        page: 1,
        pageSize: 20,
        fetched: UserMock.findAllAllUsers.length,
        total: UserMock.findAllAllUsers.length,
      });
    });

    it("Should be pagined min", async () => {
      const res = await userController.getUser(
        {} as UserFilterDto,
        1,
        3 // Too small
      );

      expect(res).toBeDefined();
      expect(res.data).toBeDefined();
      expect(res.data.length).toEqual(3);
      expect(res.paging).toBeDefined();
      expect(res.paging).toEqual({
        page: 1,
        pageSize: 3,
        fetched: 3,
        total: UserMock.findAllAllUsers.length,
      });
    });

    it("Should be min(Size, 10) size when pageSize=0", async () => {
      const res = await userController.getUser({} as UserFilterDto, 1, 0);

      expect(res.data).toBeDefined();
      expect(res.data.length).toEqual(
        Math.min(10, UserMock.findAllAllUsers.length)
      );
      expect(res.paging).toBeDefined();
      expect(res.paging).toEqual({
        page: 1,
        pageSize: 10,
        fetched: UserMock.findAllAllUsers.length,
        total: UserMock.findAllAllUsers.length,
      });
    });

    it("Should give different results when page is different", async () => {
      const resPage1 = await userController.getUser({} as UserFilterDto, 1, 3);
      const resPage2 = await userController.getUser({} as UserFilterDto, 2, 3);

      expect(resPage1).toBeDefined();
      expect(resPage2).toBeDefined();
      expect(resPage1.data).toBeDefined();
      expect(resPage2.data).toBeDefined();
      expect(resPage1.data.length).toEqual(3);
      expect(resPage2.data.length).toEqual(3);
      expect(resPage1.paging).toBeDefined();
      expect(resPage1.paging).toEqual({
        page: 1,
        pageSize: 3,
        fetched: 3,
        total: UserMock.findAllAllUsers.length,
      });
      expect(resPage2.paging).toBeDefined();
      expect(resPage2.paging).toEqual({
        page: 2,
        pageSize: 3,
        fetched: 3,
        total: UserMock.findAllAllUsers.length,
      });

      resPage1.data.map((user) => {
        expect(resPage2.data.includes(user)).toBeFalsy();
      });
    });
  });
});

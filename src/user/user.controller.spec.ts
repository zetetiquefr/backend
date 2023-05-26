import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./user.entity";
import UserMock from "./user.mock";

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
      createdUser = await userController.createUser({...user});
      expect(createdUser).toBeDefined();
    });

    it("Must have an encrypted password", async () => {
      expect(createdUser.password === user.password).toBeFalsy();
    })

    it("Must have the same name", async () => {
      expect(createdUser.name).toEqual(user.name);
    })

    it("Must have the same email", async () => {
      expect(createdUser.email).toEqual(user.email);
    })

    it("Must have an uuid", async () => {
      expect(createdUser.uuid).toBeDefined();
    })

    it("Must not be archived", async () => {
      expect(createdUser.archived).toBeFalsy();
    })

    it("Must have empty fields", async () => {
      expect(createdUser.roles).toEqual([]);
      expect(createdUser.chats).toEqual([]);
      expect(createdUser.forums).toEqual([]);
      expect(createdUser.chatHistory).toEqual([]);
      expect(createdUser.reportsChat).toEqual([]);
      expect(createdUser.reportsForum).toEqual([]);
    })
  });
});

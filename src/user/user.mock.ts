import { User } from "./user.entity";

let userArray = [];

const createdUser1: User = new User("test1", "test1@gmail.com", "test1");

const findAllUserFirstCreated: User = new User(
  "test1",
  "test1@gmail.com",
  "test1"
);
const findAllCreatedUser: User[] = [
  new User("test2", "test2@gmail.com", "test2"),
  new User("test3", "test3@gmail.com", "test3"),
  new User("test4", "test4@gmail.com", "test4"),
  new User("test5", "test5@gmail.com", "test5"),
  new User("test6", "test6@gmail.com", "test6"),
];
const findAllAllUsers: User[] = [
  findAllUserFirstCreated,
  ...findAllCreatedUser,
];

const getRouteUsers: User[] = [
  new User("getRoute1", "getroute1@gmail.com", "getroute1"),
  new User("getRoute2", "getroute2@gmail.com", "getroute2"),
  new User("getRoute3", "getroute3@gmail.com", "getroute3"),
  new User("getRoute4", "getroute4@gmail.com", "getroute4"),
  new User("getRoute5", "getroute5@gmail.com", "getroute5"),
  new User("getRoute6", "getroute6@gmail.com", "getroute6"),
  new User("getRoute7", "getroute7@gmail.com", "getroute7"),
];

const getUserUuid: User = new User(
  "getUserUuid",
  "getuseruuid@gmail.com",
  "getuseruuid"
);

const postUser: User = new User("test1", "test1@gmail.com", "test1");

const userMock = {
  find: jest.fn().mockImplementation((filter) => {
    if (filter) {
      if (!filter.where) {
        throw new Error("filter.where is undefined");
      }
      const res = userArray.filter((user) => {
        if (filter.where.name) {
          return user.name === filter.where.name;
        }
        return true;
      });
      return res.splice(filter.skip, filter.take);
    }
    return userArray;
  }),
  save: jest.fn().mockImplementation((user: User): User => {
    userArray.push(user);
    return user;
  }),
  count: jest.fn().mockImplementation((filter) => {
    if (filter) {
      if (!filter.where) {
        throw new Error("filter.where is undefined");
      }
      return userArray.filter((user) => {
        if (filter.where.name) {
          return user.name === filter.where.name;
        }
        return true;
      }).length;
    }
    return userArray.length;
  }),
  reset: jest.fn().mockImplementation(() => {
    userArray = [];
  }),
  findOne: jest.fn().mockImplementation((filter) => {
    if (filter) {
      if (!filter.where) {
        throw new Error("filter.where is undefined");
      }

      let res = userArray;

      if (filter.where.name) {
        res = res.filter((user) => user.name === filter.where.name);
      }
      if (filter.where.email) {
        res = res.filter((user) => user.email === filter.where.email);
      }
      if (filter.where.uuid) {
        res = res.filter((user) => user.uuid === filter.where.uuid);
      }
      return res[0];
    }
    throw new Error("filter is undefined");
  }),
};

export default {
  userMock,
  createdUser1,
  findAllUserFirstCreated,
  findAllCreatedUser,
  findAllAllUsers,
  postUser,
  getRouteUsers,
  getUserUuid,
  userArray,
};

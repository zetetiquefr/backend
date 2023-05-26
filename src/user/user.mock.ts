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

const userMock = {
  find: jest.fn().mockImplementation((filter) => {
    if (filter) {
      const res = userArray.filter((user) => {
        if (filter.name) {
          return user.name === filter.name;
        }
        return true;
      });
      console.log("filter", filter);
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
      return userArray.filter((user) => {
        if (filter.name) {
          return user.name === filter.name;
        }
        return true;
      }).length;
    }
    return userArray.length;
  }),
  reset: jest.fn().mockImplementation(() => {
    userArray = [];
  }),
};

export default {
  userMock,
  createdUser1,
  findAllUserFirstCreated,
  findAllCreatedUser,
  findAllAllUsers,
};

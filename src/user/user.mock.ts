import { User } from "./user.entity";

let userArray = [];

const createdUser1 = new User("test1", "test1@gmail.com", "test1");

const userMock = {
  find: jest.fn().mockImplementation((filter) => {
    if (filter) {
      return userArray.filter((user) => {
        return user.name === filter.name;
      });
    }
    return userArray;
  }),
  save: jest.fn().mockImplementation((user: User): User => {
    userArray.push(user);
    return user;
  }),
};

export default {
  userMock,
  createdUser1,
}
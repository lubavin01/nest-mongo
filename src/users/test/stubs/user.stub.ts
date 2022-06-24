import { User } from 'src/users/schemas/user.schema';

export const userWithIdStub = (): User => {
  return { ...userStub(), userId: 'aaabbb' };
};

export const userStub = (): User => {
  return {
    age: 25,
    email: 'testuser@mail.com',
    favouriteFoods: ['pancakes', 'meat'],
  };
};

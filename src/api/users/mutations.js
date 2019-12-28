import Users from './users';
const bcrypt = require('bcrypt');

export const usersMutations = {
  Mutation: {
    async signup(_, { name, email, password }) {
      console.log(`Signing up ${(name, email)}`);
      const user = await Users.findOne({
        email,
      });
      if (user) throw new Error('User already exists with that email.');

      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = await Users.create({
        name,
        email,
        password: hashedPassword,
      });
      delete createdUser.password;
      return createdUser;
    },
    async login(_, { email, password }) {
      const user = await Users.findOne({
        email,
      }).select('+password');
      if (!user) throw new Error('No user with those credentials found.');

      const providedPassword = password;
      const isLoggedIn = await bcrypt.compare(providedPassword, user.password);
      if (!isLoggedIn) throw new Error('Password incorrect');

      return user;
    },
  },
};

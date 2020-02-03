import Users from './users';
const bcrypt = require('bcrypt');

export const usersMutations = {
  Mutation: {
    async signup(_, { name, email, password }) {
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
    async joinUsers(_, { userId, email }) {
      const user = await Users.findOne({
        email,
      });
      if (!user) throw new Error('Request could not be completed.');

      const requestingUser = await Users.findById(userId);

      if (!requestingUser) throw new Error('Unknown error encountered.');
      const previousJoinRequests = user.joinRequests;

      if (
        previousJoinRequests &&
        previousJoinRequests.includes(requestingUser._id)
      )
        throw new Error('A request has already been made to this user.');

      const newJoinRequests = [
        ...previousJoinRequests,
        {
          userId,
          name: requestingUser.name,
          email: requestingUser.email,
        },
      ];
      const updatedUser = await Users.findOneAndUpdate(
        { email: email },
        { joinRequests: newJoinRequests }
      );

      return requestingUser;
    },
  },
};

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
      const userEmail = email;
      const providedPassword = password;
      const user = await Users.findOne({
        email: userEmail.toLowerCase(),
      }).select('+password');
      if (!user) throw new Error('No user with those credentials found.');

      const isLoggedIn = await bcrypt.compare(providedPassword, user.password);
      if (!isLoggedIn) throw new Error('Password incorrect');
      return user;
    },
    async joinUsers(_, { userId, email }) {
      const user = await Users.findOne({
        email: email.toLowerCase(),
      });
      if (!user) throw new Error('Request could not be completed.');

      const requestingUser = await Users.findById(userId);

      if (!requestingUser) throw new Error('Unknown error encountered.');
      const previousJoinRequests = user.joinRequests;
      const userIds = [...previousJoinRequests].map(id => {
        return JSON.stringify(id.userId);
      });
      if ([...userIds].includes(JSON.stringify(requestingUser._id))) {
        throw new Error('A request has already been made to this user.');
      }

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
    async acceptJoinRequest(_, { userId, requestingUser }) {
      const reqUser = requestingUser;
      const user = await Users.findById(userId);
      if (!user) throw new Error('No user found');
      const prevJoinedUsers = user.joinedUsers;

      const updatedJoinRequests = user.joinRequests.filter(
        i => i.userId !== reqUser
      );

      const updatedUser = await Users.findByIdAndUpdate(userId, {
        joinRequests: updatedJoinRequests,
        joinedUsers: [...prevJoinedUsers, reqUser],
      });
      if (!updatedUser) throw new Error('Error updating user.');

      return true;
    },
  },
};

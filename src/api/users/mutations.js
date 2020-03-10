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
      const userToSendRequestTo = await Users.findOne({
        email: email.toLowerCase(),
      });
      if (!userToSendRequestTo)
        throw new Error('Request could not be completed.');
      const requestingUser = await Users.findById(userId);

      if (!requestingUser) throw new Error('Unknown error encountered.');
      if (email.toLowerCase() == requestingUser.email)
        throw new Error('This is you!');
      const previousJoinRequests = userToSendRequestTo.joinRequests;
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
          sentReceived: 'received',
        },
      ];
      const updatedRequestedUser = await Users.findOneAndUpdate(
        { email: email },
        { joinRequests: newJoinRequests }
      );
      const prevJoinRequests = requestingUser.joinRequests;
      const updatedSentRequests = await Users.findByIdAndUpdate(userId, {
        joinRequests: [
          ...prevJoinRequests,
          {
            userId: userToSendRequestTo._id,
            name: userToSendRequestTo.name,
            email: userToSendRequestTo.email,
            sentReceived: 'sent',
          },
        ],
      });

      return requestingUser;
    },
    async acceptJoinRequest(_, { userId, requestingUser }) {
      const reqUser = requestingUser;
      const user = await Users.findById(userId);
      if (!user) throw new Error('No user found');
      const prevJoinedUsers = user.joinedUsers;
      if (prevJoinedUsers.includes(reqUser)) return true;

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
    async rejectJoinRequest(_, { userId, requestingUser }) {
      const reqUser = requestingUser;
      const user = await Users.findById(userId);
      if (!user) throw new Error('No user found');
      const prevJoinedUsers = user.joinedUsers;
      if (!prevJoinedUsers.includes(reqUser)) return true;
      const updatedJoinedUsers = [...prevJoinedUsers].filter(
        i => i !== reqUser
      );
      const updatedJoinRequests = user.joinRequests.filter(
        i => i.userId !== reqUser
      );

      const updatedUser = await Users.findByIdAndUpdate(userId, {
        joinRequests: updatedJoinRequests,
        joinedUsers: updatedJoinedUsers,
      });
      if (!updatedUser) throw new Error('Error updating user.');

      return true;
    },
    async removeJoinedUser(_, { userId, userToRemove }) {
      const user = await Users.findById(userId);
      if (!user) throw new Error('No user found');
      const prevJoinedUsers = user.joinedUsers;
      if (!prevJoinedUsers.includes(userToRemove)) return true;

      const updatedJoinedUsers = [...prevJoinedUsers].filter(user => {
        return user != userToRemove;
      });

      const updatedUser = await Users.findByIdAndUpdate(userId, {
        joinedUsers: updatedJoinedUsers,
      });
      if (!updatedUser) throw new Error('Error updating user.');

      return true;
    },
    async cancelJoinRequest(_, { userId, userToCancelRequestTo }) {
      const user = await Users.findById(userId);
      if (!user) throw new Error('No user found');

      const joinRequestIds = [...user.joinRequests].map(i => i.userId);
      if (!joinRequestIds.includes(userToCancelRequestTo)) return true;

      const userToCancel = await Users.findById(userToCancelRequestTo);

      const userToCancelFilteredRequests = [
        ...userToCancel.joinRequests,
      ].filter(i => i.userId !== userId);

      const updatedUserToCancel = await Users.findByIdAndUpdate(
        userToCancelRequestTo,
        { joinRequests: userToCancelFilteredRequests }
      );

      const updatedJoinRequests = [...joinRequestIds].filter(user => {
        return user !== userToCancelRequestTo;
      });

      const updatedUser = await Users.findByIdAndUpdate(userId, {
        joinRequests: updatedJoinRequests,
      });
      if (!updatedUser) throw new Error('Error updating user.');

      return true;
    },
    async breakAllConnections(_, { userId }) {
      const user = await Users.findById(userId);
      if (!user) throw new Error('No user found');

      const joinedUsers = [...user.joinedUsers].map(async joinedUser => {
        const filteredJoinedUsers = [...joinedUser.joinedUsers].filter(i => {
          return i !== userId;
        });
        const filteredJoinRequests = [...joinedUser.joinRequests].filter(i => {
          return i.userId !== userId;
        });
        const user = await Users.findByIdAndUpdate(joinedUser, {
          joinedUsers: filteredJoinedUsers,
          joinRequests: filteredJoinRequests,
        });
        return user;
      });
      const updatedUser = await Users.findByIdAndUpdate(userId, {
        joinedUsers: [],
        joinRequests: [],
      });
      const usersWithRequests = await Users.find({
        'joinRequests.userId': userId,
      });

      const updatedUsersWithRequests = [...usersWithRequests].map(
        async user => {
          const removedRequest = await Users.findByIdAndUpdate(user._id, {
            joinRequests: [...user.joinRequests].filter(
              i => i.userId !== userId
            ),
          });
          return true;
        }
      );
      if (!updatedUser) throw new Error('Error updating user.');

      return true;
    },
  },
};

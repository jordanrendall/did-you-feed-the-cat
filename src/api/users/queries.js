import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import Users from './users';

export const usersQueries = {
  Query: {
    async getUsers() {},
    async getJoinedUsers(_, { userId }) {
      const user = await Users.findById(userId);
      if (!user) throw new Error('No user found');
      if (user.joinedUsers.length === 0) return [];

      const joinedUserIds = user.joinedUsers;
      const joinedUsers = joinedUserIds.map(async id => {
        const joinedUser = await Users.findById(id);

        return {
          userId: joinedUser._id,
          email: joinedUser.email,
          name: joinedUser.name,
        };
      });

      return joinedUsers;
    },
    async getJoinRequests(_, { userId }) {
      const user = await Users.findById(userId);

      if (!user) throw new Error('No user found');
      return user.joinRequests ? user.joinRequests : [];
    },

    async getAccountSettings(_, { userId }) {
      try {
        const user = await Users.findById({
          _id: userId,
        });

        return user;
      } catch (e) {
        console.log(e);
        throw new Error('No workouts found.');
      }
    },
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); //value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    },
  }),
};

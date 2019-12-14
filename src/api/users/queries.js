import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import Users from './users';

export const usersQueries = {
  Query: {
    async getUsers() {},
    async getAccountSettings(_, { userId }) {
      try {
        console.log(userId);
        const user = await Users.findById({
          _id: userId,
        });
        console.log(user);
        delete user.password;

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

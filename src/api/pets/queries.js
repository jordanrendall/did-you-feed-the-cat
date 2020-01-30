import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import Users from '../users/users';
import Pets from './pets';

export const petsQueries = {
  Query: {
    async getPets(_, { userId }) {
      const user = await Users.findById(userId);
      const pets = await Pets.find({ _id: { $in: [...user.petIds] } });
      return pets;
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

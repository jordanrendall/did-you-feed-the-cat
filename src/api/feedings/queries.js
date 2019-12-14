import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import Feedings from './feedings';

export const feedingQueries = {
  Query: {
    async getLastFeeding(_, { petId }) {
      const lastFeeding = await Feedings.find({ petId })
        .sort('timestamp', -1)
        .limit(1);
      console.log(lastFeeding);
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

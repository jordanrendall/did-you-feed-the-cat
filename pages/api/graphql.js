import { ApolloServer, gql } from 'apollo-server-micro';
import { mergeResolvers, mergeTypeDefs } from 'graphql-toolkit';
import connectDatabase from '../../lib/mongoose';
import { feedingQueries } from '../../src/api/feedings/queries';
import { usersQueries } from '../../src/api/users/queries';
import { feedingMutations } from '../../src/api/feedings/mutations';
import { usersMutations } from '../../src/api/users/mutations';
import { petsQueries } from '../../src/api/pets/queries';
import { petsMutations } from '../../src/api/pets/mutations';
import Feedings from '../../src/api/feedings/Feedings.graphql';
import Users from '../../src/api/users/Users.graphql';
import Pets from '../../src/api/pets/Pets.graphql';

const resolvers = mergeResolvers([
  feedingQueries,
  feedingMutations,
  petsQueries,
  petsMutations,
  usersQueries,
  usersMutations,
]);

const typeDefs = mergeTypeDefs([Feedings, Users, Pets]);

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = apolloServer.createHandler({
  path: '/api/graphql',
});
export default connectDatabase(server);

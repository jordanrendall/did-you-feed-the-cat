import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import Users from '../users/users';
import Pets from './pets';

export const petsQueries = {
  Query: {
    async getPets(_, { userId }) {
      const user = await Users.findById(userId);
      const petIds = [...user.petIds];

      const pets = await Pets.find({ _id: { $in: [...petIds] } });
      pets.map(async pet => {
        if (pet.ownerName === null) {
          return await Pets.updateOne(
            { _id: pet._id },
            { $set: { ownerID: userId, ownerName: user.name } }
          );
        }
        return pet;
      });
      return pets;
    },
    async getJoinedPets(_, { userId }) {
      const user = await Users.findById(userId);
      let petIds = [];

      if (user.joinedUsers.length > 0) {
        const joinedUsers = await Users.find({
          _id: { $in: [...user.joinedUsers] },
        });
        const joinedPets = joinedUsers.map(async joinedUser => {
          const joinedUserId = joinedUser._id;
          const joinedUserName = joinedUser.name;
          const joinedUserPets = await Pets.find({
            _id: { $in: [...joinedUser.petIds] },
          });
          joinedUserPets.map(async pet => {
            const petId = pet._id;
            if (pet.ownerName === null) {
              const updatedPet = await Pets.updateOne(
                { _id: petId },
                {
                  $set: { ownerID: joinedUserId, ownerName: joinedUserName },
                }
              );
              return updatedPet;
            } else {
              return pet;
            }
          });
          petIds.push(...joinedUser.petIds);
          return joinedUser.petIds;
        });
        // petIds = joinedPets.map(pets => [...pets]);
      } else {
        return [];
      }
      // petIds2 = [...petIds];
      const pets = await Pets.find({ _id: { $in: [...petIds] } });

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

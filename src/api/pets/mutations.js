import Users from '../users/users';
import Pets from './pets';
const bcrypt = require('bcrypt');

export const petsMutations = {
  Mutation: {
    async addPet(_, { userId, name }) {
      const petOwner = await Users.findById(userId);
      const pet = await Pets.create({
        ownerID: userId,
        ownerName: petOwner.name,
        name,
      });
      if (!pet) throw new Error('Pet could not be added.');
      const user = await Users.findById(userId);
      if (!user) throw new Error('No user found.');
      const updatedUser = await Users.findByIdAndUpdate(user._id, {
        petIds: [...user.petIds, pet._id],
      });

      return pet;
    },
    async removePetFromUser(_, { userId, petId }) {
      const user = await Users.findById(userId);
      if (!user) throw new Error('No user found.');
      const joinedUsers = await Users.find({
        _id: { $in: [...user.joinedUsers] },
      });
      if (joinedUsers.length > 0) {
        const updatedPets = joinedUsers
          .map(async joinedUser => {
            if (joinedUser.petIds.includes(petId)) {
              const joinedUserUpdatedPets = [...joinedUser.petIds].filter(
                id => {
                  return id !== petId;
                }
              );
              return await Users.findOneAndUpdate(
                { _id: joinedUser._id },
                { petIds: joinedUserUpdatedPets }
              );
            }
            return [...joinedUser.petIds];
          })
          .filter(id => {
            return id !== petId;
          });
      }
      const updatedPets = [...user.petIds].filter(id => {
        return id !== petId;
      });

      const updatedUser = await Users.findByIdAndUpdate(user._id, {
        petIds: updatedPets,
      });
      const removedPet = await Pets.findByIdAndDelete(petId);
      return updatedUser;
    },
  },
};

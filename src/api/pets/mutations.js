import Users from '../users/users';
import Pets from './pets';
const bcrypt = require('bcrypt');

export const petsMutations = {
  Mutation: {
    async addPet(_, { userId, name }) {
      const pet = await Pets.create({ name });
      if (!pet) throw new Error('Pet could not be added.');
      const user = await Users.findById(userId);
      if (!user) throw new Error('No user found.');
      const updatedUser = await Users.update(
        { _id: user._id },
        { petIds: [...user.petIds, pet._id] }
      );

      return pet;
    },
    async removePetFromUser(_, { userId, petId }) {
      const user = await Users.findById(userId);
      if (!user) throw new Error('No user found.');

      const updatedPets = user.petIds.filter(id => {
        return id !== petId;
      });

      const updatedUser = await Users.findByIdAndUpdate(user._id, {
        petIds: updatedPets,
      });
      return updatedUser;
    },
  },
};

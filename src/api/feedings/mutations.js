import Users from '../users/users';
import Feedings from './feedings';
import Pets from '../pets/pets';

export const feedingMutations = {
  Mutation: {
    async logFeeding(_, { feeding }) {
      const user = await Users.findById(feeding.userId);
      if (!user) throw new Error('User does not exist');
      const now = +new Date();
      console.log(now);
      const loggedFeeding = await Feedings.create({
        ...feeding,
        timestamp: now,
      });

      const pet = await Pets.findById(feeding.petId);
      const updatedFeedings =
        pet.feedings.length > 0
          ? [...pet.feedings, loggedFeeding]
          : [loggedFeeding];
      const updatedPet = await Pets.findByIdAndUpdate(pet._id, {
        feedings: updatedFeedings,
      });
      return loggedFeeding;
    },
  },
};

import Users from '../users/users';
import Feedings from './feedings';
import Pets from '../pets/pets';

export const feedingMutations = {
  Mutation: {
    async logFeeding(_, { feeding }) {
      const user = await Users.findById(feeding.userId);
      if (!user) throw new Error('User does not exist');
      const now = +new Date();
      if (!user.petIds.includes(feeding.petId)) {
        if (user.joinedUsers.length > 0) {
          const joinedUsers = await Users.find({
            _id: { $in: [...user.joinedUsers] },
          });
          const joinedUserPetOwner = joinedUsers.filter(user => {
            return user.petIds.includes(feeding.petId);
          });
          if (joinedUserPetOwner.length > 0) {
            feeding.userId = joinedUserPetOwner[0]._id;
          } else {
            throw new Error('Could not log feeding');
          }
        }
      }
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

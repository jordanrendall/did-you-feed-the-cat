import Users from '../users/users';

export const feedingMutations = {
  Mutation: {
    async logFeeding(_, { feeding }) {
      const user = await Users.findById({
        _id: feeding.userId,
      });
      if (!user) throw new Error('User does not exist');

      const loggedFeeding = await Feedings.create({ feeding });
      return loggedFeeding;
    },
  },
};

import mongoose, { Schema } from 'mongoose';
import { FeedingSchema } from '../feedings/feedings';

export const PetSchema = new Schema({
  name: { type: String, required: true },
  feedings: { type: [FeedingSchema], required: false },
});

export const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },

  pets: { type: [PetSchema], required: false },
});

export default mongoose.models.users || mongoose.model('users', UserSchema);

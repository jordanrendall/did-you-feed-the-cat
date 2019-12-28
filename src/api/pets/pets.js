import mongoose, { Schema } from 'mongoose';
import { FeedingSchema } from '../feedings/feedings';

export const PetSchema = new Schema({
  name: { type: String, required: true },
  feedings: { type: [FeedingSchema], required: false },
});

export default mongoose.models.pets || mongoose.model('pets', PetSchema);

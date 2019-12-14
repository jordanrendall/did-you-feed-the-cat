import mongoose, { Schema } from 'mongoose';

export const FeedingSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  foodType: {
    type: String,
    required: true,
  },
});

export default mongoose.models.feedings ||
  mongoose.model('feedings', FeedingSchema);

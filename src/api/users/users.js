import mongoose, { Schema } from 'mongoose';
export const JoinRequestUserSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
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
    select: false,
  },

  petIds: { type: [String], required: false },
  joinRequests: { type: [JoinRequestUserSchema], required: false },
});

export default mongoose.models.users || mongoose.model('users', UserSchema);

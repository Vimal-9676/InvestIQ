import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    profile_picture: {
      type: String,
    },
    bio: {
      type: String,
    },
    country: {
      type: String,
    },
    preferred_currency: {
      type: String,
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system',
    },
  },
  { 
    timestamps: { 
      createdAt: 'created_at', 
      updatedAt: 'updated_at' 
    } 
  }
);

export default mongoose.model('UserProfile', UserProfileSchema);

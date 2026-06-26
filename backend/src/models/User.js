import mongoose from 'mongoose';
import crypto from 'node:crypto';

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => crypto.randomUUID(),
      unique: true,
      index: true,
    },
    full_name: {
      type: String,
      required: [true, 'Please provide a full name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password_hash: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false, // Don't return password by default
    },
    last_login: {
      type: Date,
    },
  },
  { 
    timestamps: { 
      createdAt: 'created_at', 
      updatedAt: 'updated_at' 
    } 
  }
);

export default mongoose.model('User', UserSchema);
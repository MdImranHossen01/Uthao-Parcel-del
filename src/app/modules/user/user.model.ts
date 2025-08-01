import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';

export interface TUser extends Document {
  name: string;
  email: string;
  phoneNumber: string; // <-- Add this
  password?: string;
  role: 'sender' | 'receiver' | 'admin';
  status: 'active' | 'blocked';
}

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true }, // <-- Add this
    password: { type: String, required: true, select: 0 },
    role: {
      type: String,
      enum: ['sender', 'receiver', 'admin'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(
    this.password as string,
    Number(config.bcrypt_salt_round),
  );
  next();
});

export const User = model<TUser>('User', userSchema);
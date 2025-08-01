import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, TUser } from '../user/user.model';
import config from '../../config';

const registerUser = async (payload: TUser) => {
  const user = await User.create(payload);
  const userResponse = await User.findById(user._id).select('-password');
  return userResponse;
};

const loginUser = async (payload: { email: string; password?: string }) => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new Error('User not found!');
  }
  if (user.status === 'blocked') {
    throw new Error('This user is blocked!');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password as string,
    user.password as string,
  );

  if (!isPasswordMatch) {
    throw new Error('Password does not match!');
  }

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires,
  });

  const userResponse = await User.findById(user._id).select('-password');

  return {
    user: userResponse,
    token,
  };
};

export const AuthService = {
  registerUser,
  loginUser,
};
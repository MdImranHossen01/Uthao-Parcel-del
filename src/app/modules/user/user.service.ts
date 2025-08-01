import { TUser, User } from './user.model';

const getAllUsers = async () => {
  // Exclude passwords from the result
  const result = await User.find({}).select('-password');
  return result;
};

const updateUserStatus = async (
  userId: string,
  status: TUser['status'],
) => {
  const result = await User.findByIdAndUpdate(
    userId,
    { status },
    { new: true },
  ).select('-password');

  if (!result) {
    throw new Error('User not found!');
  }

  return result;
};

export const UserService = {
  getAllUsers,
  updateUserStatus,
};
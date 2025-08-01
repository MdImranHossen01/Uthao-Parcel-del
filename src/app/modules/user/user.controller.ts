import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { UserService } from './user.service';
import { TUser } from './user.model';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();
  res.status(200).json({
    success: true,
    message: 'Users retrieved successfully!',
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { status } = req.body as { status: TUser['status'] };

  if (!status || !['active', 'blocked'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status provided. Must be 'active' or 'blocked'.",
    });
  }

  const result = await UserService.updateUserStatus(userId, status);

  res.status(200).json({
    success: true,
    message: 'User status updated successfully!',
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  updateUserStatus,
};
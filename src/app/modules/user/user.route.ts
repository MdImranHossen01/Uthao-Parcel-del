import express from 'express';
import { auth } from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

// Route to get all users
router.get('/', auth('admin'), UserController.getAllUsers);

// Route to update a user's status (block/unblock)
router.patch(
  '/:userId/update-status',
  auth('admin'),
  UserController.updateUserStatus,
);

export const UserRoutes = router;
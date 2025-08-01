import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUser } from '../modules/user/user.model';

export const auth = (...requiredRoles: TUser['role'][]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'You are not authorized!',
        });
      }

      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { role } = decoded;

      if (requiredRoles.length && !requiredRoles.includes(role)) {
        return res.status(401).json({
          success: false,
          message: 'You have no access to this route',
        });
      }

      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized Access!',
        error: err,
      });
    }
  };
};
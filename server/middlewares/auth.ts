// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IUserToken {
  _id: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  console.log("hi auth middle!");
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUserToken;
    res.locals.user = { id: decoded._id };

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
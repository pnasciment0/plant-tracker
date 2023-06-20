// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/usersModel';
import jwt from 'jsonwebtoken';

interface IUserToken {
  _id: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  console.log("hi authMiddleware");
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUserToken;
    
     // Find the user with this token
     const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

     // No user with this token, so it's not valid!
     if (!user) {
       return res.status(401).json({ msg: 'Token is not valid' });
     }
 
    res.locals.user = { id: decoded._id };

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
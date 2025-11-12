import { Request, Response, NextFunction } from 'express';
import { User } from '../models/index.js';
import { Types } from 'mongoose';

// Guest authentication middleware
export interface GuestRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

export const guestAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // For guest users, we'll create a temporary user or use a default one
    // This allows the application to work without requiring login
    
    // Check if this is a guest token
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      // If it's our guest token, proceed with guest access
      if (token === 'guest-token') {
        // Create a guest user object without saving to database
        const guestUser = {
          _id: new Types.ObjectId(),
          username: 'guest',
          email: 'guest@example.com',
          isActive: true,
          preferences: {
            language: {
              code: 'en',
              name: 'English',
              bcp47: 'en-US'
            }
          }
        };
        
        // Attach guest user to request
        (req as GuestRequest).user = {
          id: (guestUser._id as Types.ObjectId).toString(),
          username: guestUser.username
        };
        
        return next();
      }
    }
    
    // If no valid auth header, still allow guest access
    // Create a guest user object without saving to database
    const guestUser = {
      _id: new Types.ObjectId(),
      username: 'guest',
      email: 'guest@example.com',
      isActive: true,
      preferences: {
        language: {
          code: 'en',
          name: 'English',
          bcp47: 'en-US'
        }
      }
    };
    
    // Attach guest user to request
    (req as GuestRequest).user = {
      id: (guestUser._id as Types.ObjectId).toString(),
      username: guestUser.username
    };
    
    next();
  } catch (error) {
    console.error('Guest auth error:', error);
    res.status(500).json({
      success: false,
      error: 'Authentication failed'
    });
  }
};
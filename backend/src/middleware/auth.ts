import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

export const generateToken = (userId: string, username: string): string => {
  const payload = { id: userId, username };
  const secret = process.env.JWT_SECRET || 'krishi-mitra-fallback-secret';
  
  return jwt.sign(payload, secret, {
    expiresIn: '7d',
    issuer: 'krishi-mitra-api'
  });
};

export const verifyToken = (token: string): any => {
  const secret = process.env.JWT_SECRET || 'krishi-mitra-fallback-secret';
  return jwt.verify(token, secret);
};

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: 'Access token is required'
      });
      return;
    }

    const token = authHeader.substring(7);
    
    try {
      const decoded = verifyToken(token);
      
      // Verify user still exists and is active
      const user = await User.findById(decoded.id).select('-password');
      if (!user || !user.isActive) {
        res.status(401).json({
          success: false,
          error: 'Invalid token or user not found'
        });
        return;
      }

      req.user = {
        id: decoded.id,
        username: decoded.username
      };
      
      next();
    } catch (jwtError) {
      res.status(401).json({
        success: false,
        error: 'Invalid or expired token'
      });
      return;
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during authentication'
    });
  }
};

export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id).select('-password');
        
        if (user && user.isActive) {
          req.user = {
            id: decoded.id,
            username: decoded.username
          };
        }
      } catch (jwtError) {
        // Ignore JWT errors for optional auth
        console.log('Optional auth failed:', (jwtError as Error).message);
      }
    }
    
    next();
  } catch (error) {
    console.error('Optional authentication error:', error);
    next(); // Continue without authentication
  }
};
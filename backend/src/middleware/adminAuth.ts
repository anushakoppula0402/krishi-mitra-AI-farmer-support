import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from './auth.js';

// Simple admin check - in production, implement proper role-based authentication
export const adminAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const adminKey = req.headers['x-admin-key'] as string;
    const expectedKey = process.env.ADMIN_API_KEY;

    if (!expectedKey) {
      res.status(503).json({
        success: false,
        error: 'Admin functionality not configured'
      });
      return;
    }

    if (!adminKey || adminKey !== expectedKey) {
      res.status(403).json({
        success: false,
        error: 'Admin access denied'
      });
      return;
    }

    next();
  } catch (error) {
    console.error('Admin authentication error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during admin authentication'
    });
  }
};
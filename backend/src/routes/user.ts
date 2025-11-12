import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { User } from '../models/User.js';
import { ApiResponse } from '../types/index.js';

const router = Router();

// Validation middleware
const updateProfileValidation = [
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('profile.farmLocation')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Farm location cannot exceed 100 characters'),
  body('profile.farmSize')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Farm size must be a positive number'),
  body('profile.primaryCrops')
    .optional()
    .isArray()
    .withMessage('Primary crops must be an array'),
  body('profile.contactNumber')
    .optional()
    .matches(/^[+]?[\d\s-()]+$/)
    .withMessage('Please provide a valid contact number'),
];

const updatePreferencesValidation = [
  body('language.code')
    .optional()
    .isIn(['en', 'hi', 'ml', 'te'])
    .withMessage('Invalid language code'),
  body('notifications.weather')
    .optional()
    .isBoolean()
    .withMessage('Weather notification preference must be boolean'),
  body('notifications.market')
    .optional()
    .isBoolean()
    .withMessage('Market notification preference must be boolean'),
  body('notifications.schemes')
    .optional()
    .isBoolean()
    .withMessage('Schemes notification preference must be boolean'),
];

// Get user profile
router.get('/profile', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user!.id).select('-password');
    
    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'User not found'
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse = {
      success: true,
      data: { user }
    };

    res.json(response);
  } catch (error) {
    console.error('Get profile error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to get user profile'
    };
    res.status(500).json(response);
  }
});

// Update user profile
router.put('/profile', authenticate, updateProfileValidation, async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const response: ApiResponse = {
        success: false,
        error: 'Validation failed',
        data: { errors: errors.array() }
      };
      res.status(400).json(response);
      return;
    }

    const userId = req.user!.id;
    const { email, profile } = req.body;

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: userId }
      });

      if (existingUser) {
        const response: ApiResponse = {
          success: false,
          error: 'Email already exists'
        };
        res.status(409).json(response);
        return;
      }
    }

    const updateData: any = {};
    if (email) updateData.email = email.toLowerCase();
    if (profile) updateData.profile = profile;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'User not found'
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse = {
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    };

    res.json(response);
  } catch (error) {
    console.error('Update profile error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to update profile'
    };
    res.status(500).json(response);
  }
});

// Update user preferences
router.put('/preferences', authenticate, updatePreferencesValidation, async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const response: ApiResponse = {
        success: false,
        error: 'Validation failed',
        data: { errors: errors.array() }
      };
      res.status(400).json(response);
      return;
    }

    const userId = req.user!.id;
    const { language, notifications } = req.body;

    const updateData: any = {};
    if (language) updateData['preferences.language'] = language;
    if (notifications) updateData['preferences.notifications'] = notifications;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'User not found'
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse = {
      success: true,
      message: 'Preferences updated successfully',
      data: { user }
    };

    res.json(response);
  } catch (error) {
    console.error('Update preferences error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to update preferences'
    };
    res.status(500).json(response);
  }
});

// Change password
router.put('/password', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      const response: ApiResponse = {
        success: false,
        error: 'Current password and new password are required'
      };
      res.status(400).json(response);
      return;
    }

    if (newPassword.length < 6) {
      const response: ApiResponse = {
        success: false,
        error: 'New password must be at least 6 characters long'
      };
      res.status(400).json(response);
      return;
    }

    const user = await User.findById(req.user!.id);
    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'User not found'
      };
      res.status(404).json(response);
      return;
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      const response: ApiResponse = {
        success: false,
        error: 'Current password is incorrect'
      };
      res.status(400).json(response);
      return;
    }

    // Update password
    user.password = newPassword;
    await user.save();

    const response: ApiResponse = {
      success: true,
      message: 'Password changed successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Change password error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to change password'
    };
    res.status(500).json(response);
  }
});

// Delete user account
router.delete('/account', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { password } = req.body;

    if (!password) {
      const response: ApiResponse = {
        success: false,
        error: 'Password is required to delete account'
      };
      res.status(400).json(response);
      return;
    }

    const user = await User.findById(req.user!.id);
    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'User not found'
      };
      res.status(404).json(response);
      return;
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      const response: ApiResponse = {
        success: false,
        error: 'Incorrect password'
      };
      res.status(400).json(response);
      return;
    }

    // Soft delete - mark as inactive
    user.isActive = false;
    await user.save();

    const response: ApiResponse = {
      success: true,
      message: 'Account deleted successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Delete account error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to delete account'
    };
    res.status(500).json(response);
  }
});

export { router as userRoutes };
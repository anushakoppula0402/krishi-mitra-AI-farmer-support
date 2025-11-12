import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { User } from '../models/User.js';
import { generateToken, authenticate, AuthRequest } from '../middleware/auth.js';
import { ApiResponse } from '../types/index.js';

const router = Router();

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many authentication attempts, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation middleware
const registerValidation = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('password')
    .isLength({ min: 6, max: 128 })
    .withMessage('Password must be between 6 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
];

const loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .trim(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// Register endpoint
router.post('/register', authLimiter, registerValidation, async (req: Request, res: Response) => {
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

    const { username, password, email, profile } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { username: username.toLowerCase() },
        ...(email ? [{ email: email.toLowerCase() }] : [])
      ]
    });

    if (existingUser) {
      const response: ApiResponse = {
        success: false,
        error: existingUser.username.toLowerCase() === username.toLowerCase() 
          ? 'Username already exists' 
          : 'Email already exists'
      };
      res.status(409).json(response);
      return;
    }

    // Create new user
    const user = new User({
      username: username.toLowerCase(),
      password,
      email: email ? email.toLowerCase() : undefined,
      profile
    });

    await user.save();

    // Generate token
    const token = generateToken((user._id as string).toString(), user.username);

    const response: ApiResponse = {
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profile: user.profile,
          preferences: user.preferences
        },
        token
      }
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Registration error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Registration failed. Please try again.'
    };
    res.status(500).json(response);
  }
});

// Login endpoint
router.post('/login', authLimiter, loginValidation, async (req: Request, res: Response) => {
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

    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ 
      username: username.toLowerCase(),
      isActive: true 
    });

    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid username or password'
      };
      res.status(401).json(response);
      return;
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid username or password'
      };
      res.status(401).json(response);
      return;
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken((user._id as string).toString(), user.username);

    const response: ApiResponse = {
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profile: user.profile,
          preferences: user.preferences,
          lastLogin: user.lastLogin
        },
        token
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Login failed. Please try again.'
    };
    res.status(500).json(response);
  }
});

// Get current user profile
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    
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

// Logout endpoint (optional - mainly for client-side token cleanup)
router.post('/logout', authenticate, (req: AuthRequest, res: Response) => {
  const response: ApiResponse = {
    success: true,
    message: 'Logged out successfully'
  };
  res.json(response);
});

// Verify token endpoint
router.get('/verify', authenticate, (req: AuthRequest, res: Response) => {
  const response: ApiResponse = {
    success: true,
    message: 'Token is valid',
    data: { user: req.user }
  };
  res.json(response);
});

export { router as authRoutes };
import { Router, Request, Response } from 'express';
import { query, body, validationResult } from 'express-validator';
import { adminAuth } from '../middleware/adminAuth.js';
import { User, Conversation, Message, MarketPrice, WeatherAlert } from '../models/index.js';
import { ApiResponse } from '../types/index.js';

const router = Router();

// Apply admin authentication to all routes
router.use(adminAuth);

// Get analytics dashboard data
router.get('/analytics', async (req: Request, res: Response) => {
  try {
    const [
      totalUsers,
      activeUsers,
      totalConversations,
      totalMessages,
      todayUsers,
      todayConversations
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      Conversation.countDocuments(),
      Message.countDocuments(),
      User.countDocuments({ 
        createdAt: { 
          $gte: new Date(new Date().setHours(0, 0, 0, 0)) 
        } 
      }),
      Conversation.countDocuments({ 
        startTime: { 
          $gte: new Date(new Date().setHours(0, 0, 0, 0)) 
        } 
      })
    ]);

    // Get user growth over last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    // Get most active users
    const activeUsersData = await Conversation.aggregate([
      {
        $group: {
          _id: '$userId',
          conversationCount: { $sum: 1 },
          lastActivity: { $max: '$lastUpdateTime' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          username: '$user.username',
          conversationCount: 1,
          lastActivity: 1
        }
      },
      {
        $sort: { conversationCount: -1 }
      },
      {
        $limit: 10
      }
    ]);

    const response: ApiResponse = {
      success: true,
      data: {
        overview: {
          totalUsers,
          activeUsers,
          totalConversations,
          totalMessages,
          todayUsers,
          todayConversations
        },
        userGrowth,
        activeUsers: activeUsersData
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Analytics error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch analytics data'
    };
    res.status(500).json(response);
  }
});

// Get all users with pagination
router.get('/users', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string;
    const skip = (page - 1) * limit;

    let filter: any = {};
    if (search) {
      filter = {
        $or: [
          { username: new RegExp(search, 'i') },
          { email: new RegExp(search, 'i') }
        ]
      };
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filter);

    const response: ApiResponse = {
      success: true,
      data: { users },
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Get users error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch users'
    };
    res.status(500).json(response);
  }
});

// Get user details
router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');
    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'User not found'
      };
      res.status(404).json(response);
      return;
    }

    // Get user's conversation count
    const conversationCount = await Conversation.countDocuments({ userId: id });
    
    // Get user's message count
    const conversations = await Conversation.find({ userId: id }).select('_id');
    const conversationIds = conversations.map(conv => conv._id);
    const messageCount = await Message.countDocuments({ 
      conversationId: { $in: conversationIds } 
    });

    const response: ApiResponse = {
      success: true,
      data: {
        user,
        stats: {
          conversationCount,
          messageCount
        }
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Get user details error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch user details'
    };
    res.status(500).json(response);
  }
});

// Toggle user active status
router.patch('/users/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      const response: ApiResponse = {
        success: false,
        error: 'isActive must be a boolean value'
      };
      res.status(400).json(response);
      return;
    }

    const user = await User.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
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
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: { user }
    };

    res.json(response);
  } catch (error) {
    console.error('Toggle user status error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to update user status'
    };
    res.status(500).json(response);
  }
});

// Add market price data
router.post('/market-prices', async (req: Request, res: Response) => {
  try {
    const { cropName, variety, price, unit, market, state, district, trend } = req.body;

    if (!cropName || !price || !unit || !market || !state || !trend) {
      const response: ApiResponse = {
        success: false,
        error: 'Missing required fields: cropName, price, unit, market, state, trend'
      };
      res.status(400).json(response);
      return;
    }

    const marketPrice = new MarketPrice({
      cropName,
      variety,
      price,
      unit,
      market,
      state,
      district,
      trend,
      priceDate: new Date(),
      isVerified: true
    });

    await marketPrice.save();

    const response: ApiResponse = {
      success: true,
      message: 'Market price added successfully',
      data: { marketPrice }
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Add market price error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to add market price'
    };
    res.status(500).json(response);
  }
});

// Add weather alert
router.post('/weather-alerts', async (req: Request, res: Response) => {
  try {
    const { type, message, severity, regions, validFrom, validUntil } = req.body;

    if (!type || !message || !severity || !regions || !validFrom || !validUntil) {
      const response: ApiResponse = {
        success: false,
        error: 'Missing required fields'
      };
      res.status(400).json(response);
      return;
    }

    const weatherAlert = new WeatherAlert({
      type,
      message,
      severity,
      regions,
      validFrom: new Date(validFrom),
      validUntil: new Date(validUntil),
      isActive: true
    });

    await weatherAlert.save();

    const response: ApiResponse = {
      success: true,
      message: 'Weather alert added successfully',
      data: { weatherAlert }
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Add weather alert error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to add weather alert'
    };
    res.status(500).json(response);
  }
});

// Get conversation logs
router.get('/conversations', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const conversations = await Conversation.find()
      .populate('userId', 'username email')
      .populate('messages', 'role text createdAt feedback')
      .sort({ lastUpdateTime: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Conversation.countDocuments();

    const response: ApiResponse = {
      success: true,
      data: { conversations },
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Get conversations error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch conversations'
    };
    res.status(500).json(response);
  }
});

// Get feedback analytics
router.get('/feedback', async (req: Request, res: Response) => {
  try {
    const feedbackStats = await Message.aggregate([
      {
        $match: {
          role: 'ai',
          feedback: { $exists: true }
        }
      },
      {
        $group: {
          _id: '$feedback',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get recent feedback with context
    const recentFeedback = await Message.find({
      role: 'ai',
      feedback: { $exists: true }
    })
    .populate('conversationId')
    .sort({ createdAt: -1 })
    .limit(50);

    const response: ApiResponse = {
      success: true,
      data: {
        stats: feedbackStats,
        recent: recentFeedback
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Get feedback error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch feedback data'
    };
    res.status(500).json(response);
  }
});

export { router as adminRoutes };
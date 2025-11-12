import { Router, Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';
import { guestAuth, GuestRequest } from '../middleware/guestAuth.js';
import { aiLimiter, generateResponse, checkAIAvailability, processImageData } from '../services/geminiService.js';
import { User, Conversation, Message } from '../models/index.js';
import { ApiResponse, MessageRole } from '../types/index.js';

const router = Router();

// Validation middleware
const chatValidation = [
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 5000 })
    .withMessage('Message cannot exceed 5000 characters'),
  body('conversationId')
    .optional()
    .isMongoId()
    .withMessage('Invalid conversation ID'),
  body('imageBase64')
    .optional()
    .isString()
    .withMessage('Image data must be a string'),
];

const conversationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
];

// Send message endpoint
router.post('/message', guestAuth, aiLimiter, checkAIAvailability, chatValidation, async (req: GuestRequest, res: Response) => {
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

    const { message, conversationId, imageBase64 } = req.body;
    const userId = req.user!.id;

    // Get user for language preference
    const user = await User.findById(userId);
    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'User not found'
      };
      res.status(404).json(response);
      return;
    }

    let conversation: any;

    // Get or create conversation
    if (conversationId) {
      conversation = await Conversation.findOne({
        _id: conversationId,
        userId
      });
      
      if (!conversation) {
        const response: ApiResponse = {
          success: false,
          error: 'Conversation not found'
        };
        res.status(404).json(response);
        return;
      }
    } else {
      // Create new conversation
      conversation = new Conversation({
        userId,
        title: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
        messages: [],
        startTime: new Date(),
        lastUpdateTime: new Date(),
        isActive: true
      });
      await conversation.save();
    }

    // Process image if provided
    let imageData;
    if (imageBase64) {
      try {
        imageData = processImageData(imageBase64);
      } catch (error) {
        const response: ApiResponse = {
          success: false,
          error: error instanceof Error ? error.message : 'Invalid image data'
        };
        res.status(400).json(response);
        return;
      }
    }

    // Create user message
    const userMessage = new Message({
      conversationId: conversation._id,
      role: MessageRole.USER,
      text: message,
      imageUrl: imageData ? `/uploads/conversations/${conversation._id}/${Date.now()}.${imageData.mimeType.split('/')[1]}` : undefined
    });

    await userMessage.save();

    // Add message to conversation
    conversation.messages.push(userMessage._id);
    conversation.lastUpdateTime = new Date();
    await conversation.save();

    // Generate AI response
    const startTime = Date.now();
    let aiResponseText: string;

    try {
      aiResponseText = await generateResponse({
        prompt: message,
        language: user.preferences?.language || {
          code: 'en',
          name: 'English',
          bcp47: 'en-US'
        },
        imageData,
        temperature: 0.7
      });
    } catch (aiError) {
      console.error('AI generation error:', aiError);
      const response: ApiResponse = {
        success: false,
        error: aiError instanceof Error ? aiError.message : 'Failed to generate AI response'
      };
      res.status(500).json(response);
      return;
    }

    const responseTime = Date.now() - startTime;

    // Create AI message
    const aiMessage = new Message({
      conversationId: conversation._id,
      role: MessageRole.AI,
      text: aiResponseText,
      metadata: {
        responseTime,
        model: 'gemini-1.5-flash'
      }
    });

    await aiMessage.save();

    // Add AI message to conversation
    conversation.messages.push(aiMessage._id);
    conversation.lastUpdateTime = new Date();
    conversation.metadata = {
      totalMessages: conversation.messages.length,
      avgResponseTime: conversation.metadata?.avgResponseTime 
        ? (conversation.metadata.avgResponseTime + responseTime) / 2 
        : responseTime
    };
    await conversation.save();

    // Populate messages for response
    await conversation.populate('messages');

    const response: ApiResponse = {
      success: true,
      message: 'Message sent successfully',
      data: {
        conversation: {
          id: conversation._id,
          title: conversation.title,
          lastUpdateTime: conversation.lastUpdateTime
        },
        userMessage: {
          id: userMessage._id,
          text: userMessage.text,
          role: userMessage.role,
          createdAt: userMessage.createdAt,
          imageUrl: userMessage.imageUrl
        },
        aiMessage: {
          id: aiMessage._id,
          text: aiMessage.text,
          role: aiMessage.role,
          createdAt: aiMessage.createdAt,
          metadata: aiMessage.metadata
        }
      }
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Chat message error:', error);
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process message'
    };
    res.status(500).json(response);
  }
});

// Get user conversations
router.get('/conversations', guestAuth, conversationValidation, async (req: GuestRequest, res: Response) => {
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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const conversations = await Conversation.find({ userId, isActive: true })
      .sort({ lastUpdateTime: -1 })
      .skip(skip)
      .limit(limit)
      .populate('messages', 'role text createdAt')
      .lean();

    const total = await Conversation.countDocuments({ userId, isActive: true });

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
      error: 'Failed to get conversations'
    };
    res.status(500).json(response);
  }
});

// Get conversation details with messages
router.get('/conversations/:id', guestAuth, async (req: GuestRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const conversation = await Conversation.findOne({
      _id: id,
      userId,
      isActive: true
    }).populate('messages');

    if (!conversation) {
      const response: ApiResponse = {
        success: false,
        error: 'Conversation not found'
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse = {
      success: true,
      data: { conversation }
    };

    res.json(response);
  } catch (error) {
    console.error('Get conversation error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to get conversation'
    };
    res.status(500).json(response);
  }
});

// Delete conversation
router.delete('/conversations/:id', guestAuth, async (req: GuestRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const conversation = await Conversation.findOneAndUpdate(
      { _id: id, userId },
      { isActive: false },
      { new: true }
    );

    if (!conversation) {
      const response: ApiResponse = {
        success: false,
        error: 'Conversation not found'
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse = {
      success: true,
      message: 'Conversation deleted successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Delete conversation error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to delete conversation'
    };
    res.status(500).json(response);
  }
});

// Update message feedback
router.patch('/messages/:id/feedback', guestAuth, async (req: GuestRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { feedback } = req.body;

    if (!['up', 'down'].includes(feedback)) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid feedback value. Must be "up" or "down"'
      };
      res.status(400).json(response);
      return;
    }

    // Verify the message belongs to a conversation owned by the user
    const message = await Message.findById(id);
    if (!message) {
      const response: ApiResponse = {
        success: false,
        error: 'Message not found'
      };
      res.status(404).json(response);
      return;
    }

    const conversation = await Conversation.findOne({
      _id: message.conversationId,
      userId: req.user!.id
    });

    if (!conversation) {
      const response: ApiResponse = {
        success: false,
        error: 'Access denied'
      };
      res.status(403).json(response);
      return;
    }

    message.feedback = feedback;
    await message.save();

    const response: ApiResponse = {
      success: true,
      message: 'Feedback updated successfully',
      data: { message }
    };

    res.json(response);
  } catch (error) {
    console.error('Update feedback error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to update feedback'
    };
    res.status(500).json(response);
  }
});

export { router as chatRoutes };
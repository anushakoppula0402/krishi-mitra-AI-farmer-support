# Krishi Mitra Backend

A comprehensive backend API for the Krishi Mitra AI farmer support application, providing agricultural guidance, weather information, market prices, and AI-powered chat functionality.

## Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 🤖 **AI-Powered Chat** - Integration with Google Gemini AI for agricultural advice
- 🌤️ **Weather Services** - Real-time weather data and alerts
- 📈 **Market Prices** - Agricultural commodity pricing information
- 📅 **Crop Calendar** - Seasonal farming guidance
- 🏛️ **Government Schemes** - Information about agricultural subsidies and programs
- 🚜 **Machinery Info** - Agricultural equipment and rental information
- 📊 **Admin Dashboard** - Analytics and content management
- 🖼️ **Image Upload** - Crop disease diagnosis with image processing

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **AI**: Google Generative AI (Gemini)
- **Image Processing**: Sharp
- **File Upload**: Multer
- **Validation**: Express Validator
- **Language**: TypeScript

## Prerequisites

- Node.js 18 or higher
- MongoDB (local or cloud)
- Google AI API key
- OpenWeather API key (optional)

## Installation

1. **Clone and navigate to backend**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** in `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/krishi-mitra
   JWT_SECRET=your-super-secret-jwt-key
   GOOGLE_AI_API_KEY=your-google-ai-api-key
   OPENWEATHER_API_KEY=your-openweather-api-key
   FRONTEND_URL=http://localhost:5173
   ADMIN_API_KEY=your-admin-api-key
   ```

5. **Start MongoDB** (if running locally)

6. **Build and run**:
   ```bash
   # Development
   npm run dev
   
   # Production
   npm run build
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/auth/verify` - Verify token

### Chat
- `POST /api/chat/message` - Send message to AI
- `GET /api/chat/conversations` - Get user conversations
- `GET /api/chat/conversations/:id` - Get conversation details
- `DELETE /api/chat/conversations/:id` - Delete conversation
- `PATCH /api/chat/messages/:id/feedback` - Update message feedback

### Agricultural Data
- `GET /api/agricultural/weather` - Get weather data
- `GET /api/agricultural/weather-alerts` - Get weather alerts
- `GET /api/agricultural/market-prices` - Get market prices
- `GET /api/agricultural/crop-calendar` - Get crop calendar
- `GET /api/agricultural/schemes` - Get government schemes
- `GET /api/agricultural/machinery` - Get machinery info
- `GET /api/agricultural/budget-planner` - Get budget planning data
- `GET /api/agricultural/helpline` - Get helpline information

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/preferences` - Update user preferences
- `PUT /api/user/password` - Change password
- `DELETE /api/user/account` - Delete account

### Admin (requires admin key)
- `GET /api/admin/analytics` - Get analytics dashboard
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get user details
- `PATCH /api/admin/users/:id/status` - Toggle user status
- `POST /api/admin/market-prices` - Add market price data
- `POST /api/admin/weather-alerts` - Add weather alert
- `GET /api/admin/conversations` - Get conversation logs
- `GET /api/admin/feedback` - Get feedback analytics

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer your-jwt-token
```

For admin endpoints, also include:

```
x-admin-key: your-admin-api-key
```

## Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **AI Endpoints**: 100 requests per hour per IP
- **Auth Endpoints**: 5 requests per 15 minutes per IP

## Image Upload

Images are automatically processed and optimized:
- **Formats**: JPEG, PNG, WebP, GIF
- **Max Size**: 10MB
- **Processing**: Resized to max 1024x1024, converted to WebP
- **Storage**: Local filesystem in `uploads/` directory

## Error Handling

All endpoints return standardized error responses:

```json
{
  "success": false,
  "error": "Error message",
  "data": { /* additional error details */ }
}
```

## Success Responses

All successful responses follow this format:

```json
{
  "success": true,
  "message": "Success message",
  "data": { /* response data */ },
  "pagination": { /* pagination info if applicable */ }
}
```

## Database Models

### User
- Authentication and profile information
- Language preferences
- Notification settings

### Conversation
- Chat conversation metadata
- User association
- Message references

### Message
- Individual chat messages
- AI responses
- Feedback tracking

### MarketPrice
- Crop pricing data
- Regional information
- Trend tracking

### WeatherAlert
- Weather warnings
- Regional targeting
- Multilingual content

## Deployment

### Environment Variables
Set these in production:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://your-cluster-url
JWT_SECRET=generate-a-strong-secret
GOOGLE_AI_API_KEY=your-production-key
FRONTEND_URL=https://your-frontend-domain.com
```

### MongoDB Setup
1. Create a MongoDB Atlas cluster
2. Add your server IP to whitelist
3. Create a database user
4. Get connection string

### Google AI Setup
1. Visit [Google AI Studio](https://makersuite.google.com/)
2. Create a new API key
3. Add to environment variables

### Health Check
The API provides a health check endpoint:
```
GET /health
```

## Security Features

- ✅ **JWT Authentication**
- ✅ **Password Hashing** (bcrypt)
- ✅ **Rate Limiting**
- ✅ **CORS Protection**
- ✅ **Helmet Security Headers**
- ✅ **Input Validation**
- ✅ **File Upload Security**
- ✅ **Admin Access Control**

## Development

### Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Structure
```
src/
├── config/         # Database configuration
├── middleware/     # Custom middleware
├── models/         # Mongoose models
├── routes/         # API routes
├── services/       # External services
├── types/          # TypeScript types
└── server.ts       # Main server file
```

## Support

For issues and questions:
1. Check the API documentation
2. Review error messages and logs
3. Ensure all environment variables are set
4. Verify database connectivity

## License

MIT License - see LICENSE file for details.
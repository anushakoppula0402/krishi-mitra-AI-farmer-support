# Krishi Mitra Backend Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Required - Database
MONGODB_URI=mongodb://localhost:27017/krishi-mitra

# Required - JWT Secret (change this!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Required - Google AI API Key
GOOGLE_AI_API_KEY=your-google-ai-api-key

# Optional - Weather API
OPENWEATHER_API_KEY=your-openweather-api-key

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# Admin API key (change this!)
ADMIN_API_KEY=your-admin-api-key-change-this-in-production
```

### 3. Start Database
Make sure MongoDB is running:
- **Local MongoDB**: Start MongoDB service
- **MongoDB Atlas**: Use the cloud connection string

### 4. Get API Keys

#### Google AI API Key
1. Go to [Google AI Studio](https://makersuite.google.com/)
2. Create a new project or select existing
3. Generate an API key
4. Add to your `.env` file

#### OpenWeather API Key (Optional)
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for free account
3. Get your API key
4. Add to your `.env` file

### 5. Run the Application

Development mode (with hot reload):
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

### 6. Test the API

The server will start on `http://localhost:3001`

Health check:
```bash
curl http://localhost:3001/health
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Chat Endpoints
- `POST /api/chat/message` - Send message to AI
- `GET /api/chat/conversations` - Get user conversations

### Agricultural Data Endpoints
- `GET /api/agricultural/weather?city=Delhi` - Get weather data
- `GET /api/agricultural/market-prices` - Get market prices
- `GET /api/agricultural/crop-calendar` - Get crop calendar

## Frontend Integration

Update your frontend to use the backend API:

1. **Change API base URL** in your frontend from local services to:
   ```javascript
   const API_BASE_URL = 'http://localhost:3001/api';
   ```

2. **Update authentication** to use JWT tokens:
   ```javascript
   // Store token after login
   localStorage.setItem('token', response.data.token);
   
   // Add to API requests
   headers: {
     'Authorization': `Bearer ${token}`
   }
   ```

3. **Update chat service** to use backend endpoints:
   ```javascript
   const response = await fetch('/api/chat/message', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     },
     body: JSON.stringify({
       message: userMessage,
       imageBase64: imageData
     })
   });
   ```

## Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   npm run clean
   npm install
   npm run build
   ```

2. **Database Connection Failed**
   - Check MongoDB is running
   - Verify connection string in `.env`
   - Check network connectivity

3. **AI Service Unavailable**
   - Verify Google AI API key is correct
   - Check API quota and billing
   - Ensure API key has proper permissions

4. **CORS Errors**
   - Update `FRONTEND_URL` in `.env`
   - Check frontend is running on correct port

5. **Port Already in Use**
   - Change `PORT` in `.env`
   - Or stop other processes using port 3001

### Environment Variables Check
```bash
# Check if all required variables are set
node -e "
require('dotenv').config();
const required = ['MONGODB_URI', 'JWT_SECRET', 'GOOGLE_AI_API_KEY'];
required.forEach(key => {
  if (!process.env[key]) {
    console.error(\`Missing: \${key}\`);
  } else {
    console.log(\`✓ \${key}\`);
  }
});
"
```

## Production Deployment

### Environment Variables
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/krishi-mitra
JWT_SECRET=use-a-strong-random-secret
GOOGLE_AI_API_KEY=your-production-api-key
FRONTEND_URL=https://yourdomain.com
```

### Security Checklist
- [ ] Change default JWT secret
- [ ] Change default admin API key
- [ ] Use strong database passwords
- [ ] Enable database authentication
- [ ] Set up proper CORS origins
- [ ] Enable HTTPS
- [ ] Set up rate limiting
- [ ] Monitor API usage

## Support

If you encounter issues:
1. Check the logs for error details
2. Verify all environment variables are set
3. Test individual endpoints with curl or Postman
4. Check database connectivity
5. Verify API keys are valid

The backend provides detailed error messages to help with debugging.
# MongoDB Atlas Setup Guide for Krishi Mitra

## Step 1: Create MongoDB Atlas Account

1. Visit: https://www.mongodb.com/atlas
2. Click "Try Free" and create an account
3. Choose "Build a database" and select the FREE tier
4. Choose a cloud provider (AWS recommended)
5. Select a region closest to you
6. Name your cluster (default "Cluster0" is fine)
7. Click "Create Cluster"

## Step 2: Configure Database Access

1. **Create Database User:**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `krishi-admin`
   - Password: Generate a secure password or use: `KrishiMitra2024!`
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

2. **Configure Network Access:**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add your specific IP for better security
   - Click "Confirm"

## Step 3: Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Drivers"
4. Select "Node.js" and version "4.1 or later"
5. Copy the connection string - it will look like:
   ```
   mongodb+srv://krishi-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 4: Update Your Backend

Replace the MONGODB_URI in your `.env` file with:
```
MONGODB_URI=mongodb+srv://krishi-admin:KrishiMitra2024!@cluster0.xxxxx.mongodb.net/krishi-mitra?retryWrites=true&w=majority
```

**Important Notes:**
- Replace `<password>` with your actual password
- Replace `cluster0.xxxxx.mongodb.net` with your actual cluster URL
- Add `/krishi-mitra` before the `?` to specify the database name

## Step 5: Test Connection

Restart your backend server:
```bash
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Krishi Mitra Backend running on port 3001
🤖 AI Service: Connected
```

## Step 6: Verify Database Features

Once connected, these features will be available:
- User registration and login
- Chat history storage
- Message persistence
- User profiles and preferences
- Admin analytics

## Troubleshooting

If connection fails:
1. Check username/password are correct
2. Verify IP whitelist includes your IP
3. Ensure the database name is specified in the connection string
4. Check firewall settings

## Security Best Practices

For production:
1. Use specific IP addresses instead of 0.0.0.0/0
2. Create separate users for different environments
3. Use strong, unique passwords
4. Enable two-factor authentication on your Atlas account
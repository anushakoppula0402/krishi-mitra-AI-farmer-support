const fetch = require('node-fetch-commonjs');

async function testConnection() {
  try {
    console.log('Testing backend connection...');
    
    // Test health endpoint
    const healthResponse = await fetch('http://localhost:3004/health');
    const healthData = await healthResponse.json();
    console.log('Health check:', healthData);
    
    // Test chat endpoint
    const chatResponse = await fetch('http://localhost:3004/api/chat/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer guest-token'
      },
      body: JSON.stringify({
        message: 'Hello, how are you?'
      })
    });
    
    console.log('Chat response status:', chatResponse.status);
    const chatData = await chatResponse.json();
    console.log('Chat response:', chatData);
    
  } catch (error) {
    console.error('Connection test failed:', error);
  }
}

testConnection();
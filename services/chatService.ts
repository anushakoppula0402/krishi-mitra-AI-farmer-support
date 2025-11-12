const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:3004/api' 
  : '/api';

// Get token from localStorage (for simplified auth, we'll use a placeholder)
const getToken = () => {
  // For the simplified authentication system, we don't require a real token
  // but we still include the header to satisfy the backend API requirements
  return 'guest-token'; // Placeholder token for guest users
};

// Handle API errors
const handleApiError = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = `API error: ${response.status} ${response.statusText}`;
    
    try {
      const errorData = await response.json();
      if (errorData.error) {
        errorMessage = errorData.error;
      }
    } catch (e) {
      // If we can't parse the error response, use the default message
    }
    
    throw new Error(errorMessage);
  }
  return response;
};

// Send message to backend
export const sendMessage = async (message: string, imageBase64?: string) => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/chat/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      message,
      imageBase64
    })
  });

  await handleApiError(response);
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to send message');
  }
  
  return data.data;
};

// Get user conversations
export const getConversations = async (page: number = 1, limit: number = 10) => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/chat/conversations?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  await handleApiError(response);
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to get conversations');
  }
  
  return data.data;
};

// Get conversation details
export const getConversation = async (id: string) => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/chat/conversations/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  await handleApiError(response);
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to get conversation');
  }
  
  return data.data;
};

// Delete conversation
export const deleteConversation = async (id: string) => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/chat/conversations/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  await handleApiError(response);
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to delete conversation');
  }
  
  return data;
};

// Update message feedback
export const updateFeedback = async (id: string, feedback: 'up' | 'down') => {
  const token = getToken();
  
  const response = await fetch(`${API_BASE_URL}/chat/messages/${id}/feedback`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ feedback })
  });

  await handleApiError(response);
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to update feedback');
  }
  
  return data.data;
};
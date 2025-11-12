import { useState, useEffect } from 'react';
import type { User } from '../types';

// Simplified auth hook without login/signup functionality
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>({ username: 'Guest' });

  useEffect(() => {
    // Initialize with a default user
    setCurrentUser({ username: 'Guest' });
  }, []);

  const logout = () => {
    // In this simplified version, we don't actually log out
    // but we could implement this if needed
    console.log('Logout requested but not implemented in simplified auth');
  };

  return { currentUser, logout };
};
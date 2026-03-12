import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type Level = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface User {
  username: string;
  password?: string;
  level: Level;
  completedLessons: string[];
  points: number;
  lastScore: number;
  badges: number;
}

interface LoginResult {
  success: boolean;
  error?: string;
}

interface UserContextType {
  user: User | null;
  name: string; // Keep for backward compatibility/easy access
  level: Level; // Keep for backward compatibility/easy access
  completedLessons: string[]; // Keep for backward compatibility/easy access
  points: number;
  lastScore: number;
  badges: number;
  setName: (name: string) => void; // Keep for compatibility
  setLevel: (level: Level) => void; // Keep for compatibility
  markLessonComplete: (lessonId: string) => void;
  updateScore: (score: number) => void;
  signUp: (username: string, password: string, level: Level) => void;
  login: (username: string, password: string) => LoginResult;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Initialize user from localStorage if available
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Temporary state for signup flow before actual registration
  const [tempName, setTempName] = useState('');
  const [tempLevel, setTempLevel] = useState<Level>('Beginner');

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const signUp = (username: string, password: string, level: Level) => {
    const newUser: User = {
      username,
      password,
      level,
      completedLessons: [],
      points: 0,
      lastScore: 0,
      badges: 0
    };

    // Save to users list
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    users[username] = newUser;
    localStorage.setItem('users', JSON.stringify(users));

    // Set current user
    setUser(newUser);
  };

  const login = (username: string, password: string): LoginResult => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const targetUser = users[username];

    if (!targetUser) {
      return { success: false, error: "couldn't find an account with this username" };
    }

    if (targetUser.password !== password) {
      return { success: false, error: "incorrect password" };
    }

    // Reset points and migrate existing users
    const migratedUser = {
      ...targetUser,
      points: 0,
      lastScore: targetUser.lastScore || 0,
      badges: targetUser.badges || 0
    };

    setUser(migratedUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const markLessonComplete = (lessonId: string) => {
    if (!user) return;
    
    setUser(prev => {
      if (!prev) return null;
      if (prev.completedLessons.includes(lessonId)) return prev;
      
      const updatedUser = {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        badges: Math.floor(((prev.completedLessons?.length || 0) + 1) / 3)
      };
      
      // Update in localStorage users list as well
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      users[prev.username] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
      
      return updatedUser;
    });
  };

  const updateScore = (score: number) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      
      // Accumulate points and update lastScore
      const updatedUser = {
        ...prev,
        lastScore: score,
        points: (prev.points || 0) + score
      };
      
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      users[prev.username] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));

      return updatedUser;
    });
  };

  // Helper setters that update the current user object or temp state
  const setName = (name: string) => {
    if (user) {
      setUser({ ...user, username: name });
    } else {
      setTempName(name);
    }
  };

  const setLevel = (level: Level) => {
    if (user) {
      const updatedUser = { ...user, level };
      setUser(updatedUser);
       // Update in localStorage users list
       const users = JSON.parse(localStorage.getItem('users') || '{}');
       users[user.username] = updatedUser;
       localStorage.setItem('users', JSON.stringify(users));
    } else {
      setTempLevel(level);
    }
  };

  // Add a one-time fix for the current user session
  useEffect(() => {
    if (user && user.points > 1000) { // Arbitrary "big figure" check
      setUser(prev => prev ? { ...prev, points: 0 } : null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ 
      user, 
      name: user ? user.username : tempName, 
      level: user ? user.level : tempLevel, 
      completedLessons: user ? user.completedLessons : [],
      points: user ? user.points : 0,
      lastScore: user ? user.lastScore : 0,
      badges: user ? user.badges : 0,
      setName, 
      setLevel, 
      markLessonComplete,
      updateScore,
      signUp,
      login,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};

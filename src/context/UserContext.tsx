import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export interface User {
  username: string;
  password?: string;
  level: Level;
  completedLessons: string[];
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
  setName: (name: string) => void; // Keep for compatibility
  setLevel: (level: Level) => void; // Keep for compatibility
  markLessonComplete: (lessonId: string) => void;
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
      completedLessons: []
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

    setUser(targetUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setTempName('');
    setTempLevel('Beginner');
  };

  const markLessonComplete = (lessonId: string) => {
    if (!user) return;
    
    setUser(prev => {
      if (!prev) return null;
      if (prev.completedLessons.includes(lessonId)) return prev;
      
      const updatedUser = {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId]
      };
      
      // Update in localStorage users list as well
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      users[prev.username] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
      
      return updatedUser;
    });
  };

  // Helper setters that update the current user object or temp state
  const setName = (name: string) => {
    if (user) {
      // If logged in, we generally shouldn't change username, but if needed:
      // setUser({ ...user, username: name });
      // For now, let's just update temp state if not logged in
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

  return (
    <UserContext.Provider value={{ 
      user, 
      name: user ? user.username : tempName, 
      level: user ? user.level : tempLevel, 
      completedLessons: user ? user.completedLessons : [],
      setName, 
      setLevel, 
      markLessonComplete,
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

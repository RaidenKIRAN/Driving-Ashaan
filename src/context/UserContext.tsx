import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type Level = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface User {
  username: string;
  password?: string;
  level: Level;
  completedLessons: string[];
  simulationScores: Record<string, number>;
}

interface LoginResult {
  success: boolean;
  error?: string;
}

interface UserContextType {
  user: User | null;
  name: string;
  level: Level;
  completedLessons: string[];
  simulationScores: Record<string, number>;
  setName: (name: string) => void;
  setLevel: (level: Level) => void;
  markLessonComplete: (lessonId: string) => void;
  setSimulationScore: (lessonId: string, score: number) => void;
  signUp: (username: string, password: string, level: Level) => void;
  login: (username: string, password: string) => LoginResult;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const normalizeUser = (raw: any): User => ({
  username: raw?.username || '',
  password: raw?.password,
  level: (raw?.level || 'Beginner') as Level,
  completedLessons: Array.isArray(raw?.completedLessons) ? raw.completedLessons : [],
  simulationScores:
    raw?.simulationScores && typeof raw.simulationScores === 'object' ? raw.simulationScores : {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? normalizeUser(JSON.parse(savedUser)) : null;
  });

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
      simulationScores: {},
    };

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    users[username] = newUser;
    localStorage.setItem('users', JSON.stringify(users));
    setUser(newUser);
  };

  const login = (username: string, password: string): LoginResult => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const targetUser = users[username];

    if (!targetUser) {
      return { success: false, error: "couldn't find an account with this username" };
    }

    if (targetUser.password !== password) {
      return { success: false, error: 'incorrect password' };
    }

    setUser(normalizeUser(targetUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setTempName('');
    setTempLevel('Beginner');
  };

  const setName = (name: string) => {
    if (!user) {
      setTempName(name);
    }
  };

  const setLevel = (level: Level) => {
    if (!user) {
      setTempLevel(level);
      return;
    }

    const updatedUser = { ...user, level };
    setUser(updatedUser);

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    users[user.username] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));
  };

  const markLessonComplete = (lessonId: string) => {
    if (!user) return;

    setUser((prev) => {
      if (!prev || prev.completedLessons.includes(lessonId)) return prev;

      const updatedUser = {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };

      const users = JSON.parse(localStorage.getItem('users') || '{}');
      users[prev.username] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));

      return updatedUser;
    });
  };

  const setSimulationScore = (lessonId: string, score: number) => {
    if (!user) return;

    setUser((prev) => {
      if (!prev) return null;

      const updatedUser = {
        ...prev,
        simulationScores: { ...prev.simulationScores, [lessonId]: score },
      };

      const users = JSON.parse(localStorage.getItem('users') || '{}');
      users[prev.username] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));

      return updatedUser;
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        name: user ? user.username : tempName,
        level: user ? user.level : tempLevel,
        completedLessons: user ? user.completedLessons : [],
        simulationScores: user ? user.simulationScores : {},
        setName,
        setLevel,
        markLessonComplete,
        setSimulationScore,
        signUp,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};

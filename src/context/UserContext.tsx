import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

interface UserContextType {
  name: string;
  setName: (name: string) => void;
  level: Level;
  setLevel: (level: Level) => void;
  completedLessons: string[];
  markLessonComplete: (lessonId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState<Level>('Beginner');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const markLessonComplete = (lessonId: string) => {
    setCompletedLessons(prev => {
      if (prev.includes(lessonId)) return prev;
      return [...prev, lessonId];
    });
  };

  return (
    <UserContext.Provider value={{ name, setName, level, setLevel, completedLessons, markLessonComplete }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};

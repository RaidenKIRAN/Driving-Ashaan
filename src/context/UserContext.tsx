import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

interface UserContextType {
  name: string;
  setName: (name: string) => void;
  level: Level;
  setLevel: (level: Level) => void;
  completedLessons: string[];
  simulationScores: Record<string, number>;
  markLessonComplete: (lessonId: string) => void;
  setSimulationScore: (lessonId: string, score: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState<Level>('Beginner');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [simulationScores, setSimulationScores] = useState<Record<string, number>>({});

  const markLessonComplete = (lessonId: string) => {
    setCompletedLessons(prev => {
      if (prev.includes(lessonId)) return prev;
      return [...prev, lessonId];
    });
  };

  const setSimulationScore = (lessonId: string, score: number) => {
    setSimulationScores(prev => ({ ...prev, [lessonId]: score }));
  };

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        level,
        setLevel,
        completedLessons,
        simulationScores,
        markLessonComplete,
        setSimulationScore
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

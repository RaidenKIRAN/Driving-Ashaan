import { useUser } from '../context/UserContext';
import { lessons } from '../data/lessons';
import { motion } from 'framer-motion';
import { Play, Clock, CheckCircle, LogOut, Lock, BrainCircuit, Trophy, TrendingUp, Medal } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

const Dashboard = () => {
  const { name, level, completedLessons, logout, points, lastScore, badges } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const isNewSignup = location.state?.isNewSignup;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const recommendedLessons = lessons.filter(l => 
    l.type !== 'quiz' && (
      l.level === level || 
      ((l.id === '6' || l.id === '4' || l.id === '1') && level === 'Beginner') ||
      ((l.id === '6' || l.id === '1') && level === 'Intermediate')
    )
  );

  const quizLessons = lessons.filter(l => l.type === 'quiz');

  const otherLessons = lessons.filter(l => 
    l.level !== level && 
    l.type !== 'quiz' && 
    !((l.id === '6' || l.id === '4' || l.id === '1') && level === 'Beginner') &&
    !((l.id === '6' || l.id === '1') && level === 'Intermediate')
  );

  const getLockedStatus = (lesson: any) => {
    // Theories are never locked regardless of level
    if (lesson.type === 'theory') return false;

    // Beginner level locking rules
    if (level === 'Beginner') {
      // Simulations are locked for beginners
      if (lesson.type === 'simulation') return true;
      // Intermediate level quizzes/content is locked for beginners
      if (lesson.level === 'Intermediate') return true;
      // Explicitly lock intermediate quiz
      if (lesson.id === '8') return true;
    }
    
    // Intermediate level locking rules
    if (level === 'Intermediate') {
      // Advanced content (if any) is locked for intermediate
      if (lesson.level === 'Advanced') return true;
    }

    return false;
  };

  const stats = [
    { label: 'Total Points', value: points, icon: Trophy, color: 'bg-blue-500/10 text-blue-500' },
    { label: 'Last Session', value: `${lastScore} pts`, icon: TrendingUp, color: 'bg-green-500/10 text-green-500' },
    { label: 'Badges', value: badges, icon: Medal, color: 'bg-orange-500/10 text-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{isNewSignup ? 'Welcome' : 'Welcome back'}, {name}</h1>
            <p className="text-gray-400 mt-2">Current Level: <span className="text-blue-400 font-semibold">{level}</span></p>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-red-400 rounded-xl font-medium border border-gray-700 flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </motion.button>
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
              <span className="text-xl font-bold text-blue-500">{name.charAt(0).toUpperCase()}</span>
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-6 flex items-center gap-6 shadow-lg shadow-black/20"
            >
              <div className={clsx("p-4 rounded-xl", stat.color)}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Play className="w-6 h-6 text-blue-500" />
            Recommended Lessons
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedLessons.map((lesson, index) => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson} 
                index={index} 
                level={level}
                isCompleted={completedLessons.includes(lesson.id)}
                isLocked={getLockedStatus(lesson)}
              />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-purple-500" />
            Quiz
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizLessons.map((lesson, index) => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson} 
                index={index} 
                level={level}
                isCompleted={completedLessons.includes(lesson.id)}
                isLocked={getLockedStatus(lesson)}
              />
            ))}
          </div>
        </section>

        {otherLessons.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-400">Other Modules</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
              {otherLessons.map((lesson, index) => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  index={index} 
                  level={level}
                  isCompleted={completedLessons.includes(lesson.id)}
                  isLocked={getLockedStatus(lesson)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const LessonCard = ({ lesson, index, isCompleted, isLocked, level }: { lesson: any, index: number, isCompleted: boolean, isLocked?: boolean, level: string }) => {
  const Icon = lesson.icon;
  const navigate = useNavigate();
  
  const displayTitle = lesson.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => !isLocked && navigate('/lesson/' + lesson.id)}
      className={clsx(
        "border rounded-2xl p-6 transition-all relative overflow-hidden",
        isLocked ? "bg-gray-800/50 border-gray-700 cursor-not-allowed opacity-75" : "hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer group",
        isCompleted ? "bg-gray-800/50 border-green-500/50" : (!isLocked && "bg-gray-800 border-gray-700 hover:border-blue-500/50")
      )}
    >
      {isCompleted && (
        <div className="absolute top-0 right-0 p-2 bg-green-500/10 rounded-bl-2xl">
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
      )}
      {isLocked && (
        <div className="absolute top-0 right-0 p-2 bg-gray-700/50 rounded-bl-2xl">
          <Lock className="w-5 h-5 text-gray-400" />
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <div className={clsx(
          "p-3 rounded-xl transition-colors",
          isCompleted ? "bg-green-500/10" : (isLocked ? "bg-gray-700" : "bg-gray-700/50 group-hover:bg-blue-500/20")
        )}>
          <Icon className={clsx("w-6 h-6", isCompleted ? "text-green-500" : (isLocked ? "text-gray-500" : "text-blue-400 group-hover:text-blue-300"))} />
        </div>
        <span className="text-xs font-medium px-3 py-1 bg-gray-700 rounded-full text-gray-300">
          {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
        </span>
      </div>
      <h3 className={clsx("text-xl font-semibold mb-2 transition-colors", isCompleted ? "text-green-100" : (isLocked ? "text-gray-400" : "group-hover:text-blue-400"))}>{displayTitle}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{lesson.description}</p>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {lesson.duration}
        </div>
        {isLocked && (
          <div className="text-orange-400 text-xs flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Locked: Upgrade Level
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;

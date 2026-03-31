import { useUser } from '../context/UserContext';
import { lessons } from '../data/lessons';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Play, Clock, CheckCircle, Lock, BrainCircuit, Trophy, TrendingUp, Medal } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { ProfileMenu } from '../components/ProfileMenu';

const CountUpCount = ({ value }: { value: number | string }) => {
  const [count, setCount] = useState(0);
  const numValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, ''), 10) : value;
  
  useEffect(() => {
    if (isNaN(numValue)) return;
    let start = 0;
    const end = numValue;
    if (start === end) return;
    
    let totalDuration = 1000;
    let incrementTime = (totalDuration / end) * 2;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [numValue]);

  if (isNaN(numValue)) return <>{value}</>;
  return <>{count}{typeof value === 'string' && value.includes('pts') ? ' pts' : ''}</>;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const Dashboard = () => {
  const { name, level, completedLessons, points, lastScore, badges } = useUser();
  
  const location = useLocation();
  const isNewSignup = location.state?.isNewSignup;

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
    if (lesson.type === 'theory') return false;
    if (level === 'Beginner') {
      if (lesson.type === 'simulation') return true;
      if (lesson.level === 'Intermediate') return true;
      if (lesson.id === '8') return true;
    }
    if (level === 'Intermediate') {
      if (lesson.level === 'Advanced') return true;
    }
    return false;
  };

  const stats = [
    { label: 'Total Points', value: points, icon: Trophy, color: 'from-blue-600 to-blue-400', shadow: 'shadow-blue-500/20' },
    { label: 'Last Session', value: `${lastScore} pts`, icon: TrendingUp, color: 'from-emerald-600 to-emerald-400', shadow: 'shadow-emerald-500/20' },
    { label: 'Badges', value: badges, icon: Medal, color: 'from-purple-600 to-purple-400', shadow: 'shadow-purple-500/20' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 md:p-8 relative overflow-hidden transition-colors duration-300">
      {/* Dynamic Background Gradient */}
      <motion.div 
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gradient-to-bl from-blue-900/10 via-emerald-900/5 to-transparent rounded-full blur-[100px] pointer-events-none translate-x-1/4 -translate-y-1/4"
      />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto space-y-12 relative z-10"
      >
        <motion.header variants={itemVariants} className="relative z-20 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-gray-100 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-200 dark:border-gray-700/50 backdrop-blur-md">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 dark:from-white to-gray-500 dark:to-gray-400">
              {isNewSignup ? 'Welcome' : 'Welcome back'}, {name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
              Current Level: 
              <span className="px-3 py-1 bg-blue-600/20 text-blue-600 dark:text-blue-400 rounded-full font-semibold border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                {level}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <ProfileMenu />
          </div>
        </motion.header>

        {/* Stats Section */}
        <section className="grid md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              key={stat.label}
              className={clsx("bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 rounded-3xl p-6 flex items-center gap-6 backdrop-blur-md shadow-lg transition-all", stat.shadow)}
            >
              <div className={clsx("p-4 rounded-2xl bg-gradient-to-br", stat.color)}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  <CountUpCount value={stat.value} />
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Play className="w-6 h-6 text-blue-400" />
            </div>
            Recommended Lessons
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedLessons.map((lesson) => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson} 
                isCompleted={completedLessons.includes(lesson.id)}
                isLocked={getLockedStatus(lesson)}
              />
            ))}
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <BrainCircuit className="w-6 h-6 text-purple-400" />
            </div>
            Quizzes & Assessments
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizLessons.map((lesson) => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson} 
                isCompleted={completedLessons.includes(lesson.id)}
                isLocked={getLockedStatus(lesson)}
              />
            ))}
          </div>
        </motion.section>

        {otherLessons.length > 0 && (
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-500 flex items-center gap-3">
              Other Modules
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
              {otherLessons.map((lesson) => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  isCompleted={completedLessons.includes(lesson.id)}
                  isLocked={getLockedStatus(lesson)}
                />
              ))}
            </div>
          </motion.section>
        )}
      </motion.div>
    </div>
  );
};

const LessonCard = ({ lesson, isCompleted, isLocked }: { lesson: any, isCompleted: boolean, isLocked?: boolean }) => {
  const Icon = lesson.icon;
  const navigate = useNavigate();
  const displayTitle = lesson.title;

  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.03, y: -5 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      onClick={() => !isLocked && navigate('/lesson/' + lesson.id)}
      className={clsx(
        "border rounded-3xl p-6 transition-all relative overflow-hidden flex flex-col h-full",
        isLocked 
          ? "bg-gray-100 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700/50 cursor-not-allowed opacity-60" 
          : "hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer group",
        isCompleted 
          ? "bg-green-50 dark:bg-gray-800/80 border-green-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
          : (!isLocked && "bg-white dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 hover:border-blue-500/50 backdrop-blur-sm")
      )}
    >
      {/* Hover Gradient Effect */}
      {!isLocked && !isCompleted && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-transparent transition-all duration-500" />
      )}

      {isCompleted && (
        <div className="absolute top-0 right-0 p-3 bg-gradient-to-bl from-green-500/20 to-transparent rounded-bl-3xl">
          <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
        </div>
      )}
      {isLocked && (
        <div className="absolute top-0 right-0 p-3 bg-gradient-to-bl from-gray-200 dark:from-gray-700/50 to-transparent rounded-bl-3xl">
          <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
      )}

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={clsx(
          "p-3 rounded-2xl transition-colors",
          isCompleted ? "bg-green-100 dark:bg-green-500/20" : (isLocked ? "bg-gray-200 dark:bg-gray-700/50" : "bg-gray-100 dark:bg-gray-700/50 group-hover:bg-blue-500/30")
        )}>
          <Icon className={clsx("w-6 h-6", isCompleted ? "text-green-600 dark:text-green-400" : (isLocked ? "text-gray-400 dark:text-gray-500" : "text-blue-600 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-white transition-colors"))} />
        </div>
        <span className={clsx(
          "text-xs font-semibold px-3 py-1 rounded-full border",
          isLocked ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700" : "bg-white dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600"
        )}>
          {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
        </span>
      </div>
      
      <div className="relative z-10 flex flex-col flex-grow">
        <h3 className={clsx("text-xl font-bold mb-2 transition-colors", isCompleted ? "text-green-900 dark:text-green-50" : (isLocked ? "text-gray-400 dark:text-gray-400" : "text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300"))}>{displayTitle}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 flex-grow">{lesson.description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700/50">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            {lesson.duration}
          </div>
          {isLocked && (
            <div className="text-orange-500 dark:text-orange-400/80 text-xs font-semibold flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Locked
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

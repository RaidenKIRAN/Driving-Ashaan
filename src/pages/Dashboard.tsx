import { motion } from 'framer-motion';
import { Clock, CheckCircle, Lock, LogOut, Play } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { lessons } from '../data/lessons';
import { useUser } from '../context/UserContext';

const Dashboard = () => {
  const { name, level, completedLessons, simulationScores, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const isNewSignup = Boolean(location.state?.isNewSignup);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const recommendedLessons = lessons.filter((l) => l.level === level || l.type === 'quiz');
  const otherLessons = lessons.filter((l) => l.level !== level && l.type !== 'quiz');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{isNewSignup ? 'Welcome' : 'Welcome back'}, {name}</h1>
            <p className="text-gray-400 mt-2">
              Current Level: <span className="text-blue-400 font-semibold">{level}</span>
            </p>
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
                isCompleted={completedLessons.includes(lesson.id)}
                isLocked={lesson.type === 'simulation' && level === 'Beginner'}
                score={simulationScores[lesson.id]}
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
                  isCompleted={completedLessons.includes(lesson.id)}
                  isLocked={lesson.type !== 'quiz' && level === 'Beginner'}
                  score={simulationScores[lesson.id]}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const LessonCard = ({
  lesson,
  index,
  isCompleted,
  isLocked,
  score,
}: {
  lesson: any;
  index: number;
  isCompleted: boolean;
  isLocked?: boolean;
  score?: number;
}) => {
  const Icon = lesson.icon;
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => !isLocked && navigate('/lesson/' + lesson.id)}
      className={clsx(
        'border rounded-2xl p-6 transition-all relative overflow-hidden',
        isLocked
          ? 'bg-gray-800/50 border-gray-700 cursor-not-allowed opacity-75'
          : 'hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer group',
        isCompleted
          ? 'bg-gray-800/50 border-green-500/50'
          : !isLocked && 'bg-gray-800 border-gray-700 hover:border-blue-500/50'
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
        <div
          className={clsx(
            'p-3 rounded-xl transition-colors',
            isCompleted ? 'bg-green-500/10' : isLocked ? 'bg-gray-700' : 'bg-gray-700/50 group-hover:bg-blue-500/20'
          )}
        >
          <Icon
            className={clsx(
              'w-6 h-6',
              isCompleted ? 'text-green-500' : isLocked ? 'text-gray-500' : 'text-blue-400 group-hover:text-blue-300'
            )}
          />
        </div>
        <span className="text-xs font-medium px-3 py-1 bg-gray-700 rounded-full text-gray-300">
          {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
        </span>
      </div>
      <h3
        className={clsx(
          'text-xl font-semibold mb-2 transition-colors',
          isCompleted ? 'text-green-100' : isLocked ? 'text-gray-400' : 'group-hover:text-blue-400'
        )}
      >
        {lesson.title}
      </h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{lesson.description}</p>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {lesson.duration}
        </div>
        <div className="flex items-center gap-1">
          {lesson.type === 'simulation' && typeof score === 'number' ? (
            <span className="text-emerald-400 font-medium">Score: {score}</span>
          ) : isLocked && lesson.type === 'simulation' ? (
            <span className="text-orange-400">Pass Quiz to Unlock</span>
          ) : isCompleted ? (
            <span className="text-green-500 font-medium">Completed</span>
          ) : (
            <span>0% Complete</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

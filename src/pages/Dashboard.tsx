import { useUser } from '../context/UserContext';
import { lessons } from '../data/lessons';
import { motion } from 'framer-motion';
import { Play, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

const Dashboard = () => {
  const { name, level, completedLessons } = useUser();

  const recommendedLessons = lessons.filter(l => l.level === level);
  const otherLessons = lessons.filter(l => l.level !== level);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {name}</h1>
            <p className="text-gray-400 mt-2">Current Level: <span className="text-blue-400 font-semibold">{level}</span></p>
          </div>
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
            <span className="text-xl font-bold text-blue-500">{name.charAt(0).toUpperCase()}</span>
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
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const LessonCard = ({ lesson, index, isCompleted }: { lesson: any, index: number, isCompleted: boolean }) => {
  const Icon = lesson.icon;
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate('/lesson/' + lesson.id)}
      className={clsx(
        "border rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-blue-500/10 group cursor-pointer relative overflow-hidden",
        isCompleted ? "bg-gray-800/50 border-green-500/50" : "bg-gray-800 border-gray-700 hover:border-blue-500/50"
      )}
    >
      {isCompleted && (
        <div className="absolute top-0 right-0 p-2 bg-green-500/10 rounded-bl-2xl">
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <div className={clsx(
          "p-3 rounded-xl transition-colors",
          isCompleted ? "bg-green-500/10" : "bg-gray-700/50 group-hover:bg-blue-500/20"
        )}>
          <Icon className={clsx("w-6 h-6", isCompleted ? "text-green-500" : "text-blue-400 group-hover:text-blue-300")} />
        </div>
        <span className="text-xs font-medium px-3 py-1 bg-gray-700 rounded-full text-gray-300">
          {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
        </span>
      </div>
      <h3 className={clsx("text-xl font-semibold mb-2 transition-colors", isCompleted ? "text-green-100" : "group-hover:text-blue-400")}>{lesson.title}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{lesson.description}</p>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {lesson.duration}
        </div>
        <div className="flex items-center gap-1">
          {isCompleted ? (
            <span className="text-green-500 font-medium flex items-center gap-1">
              Completed
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              0% Complete
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

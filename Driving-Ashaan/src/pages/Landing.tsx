import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Shield, GraduationCap, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';
import type { Level } from '../context/UserContext';
import { clsx } from 'clsx';

const levels: { id: Level; title: string; description: string; icon: React.ElementType }[] = [
  {
    id: 'Beginner',
    title: 'Beginner',
    description: 'New to driving? Start with the basics of road safety and signs.',
    icon: GraduationCap,
  },
  {
    id: 'Intermediate',
    title: 'Intermediate',
    description: 'Have some experience? Sharpen your skills and learn complex rules.',
    icon: Car,
  },
  {
    id: 'Advanced',
    title: 'Advanced',
    description: 'Refresher course? Master defensive driving and difficult scenarios.',
    icon: Shield,
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const { name, setName, level, setLevel } = useUser();
  const [password, setPassword] = useState('');

  const handleStart = () => {
    if (name.trim()) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full space-y-12"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20"
          >
            <Car className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 py-2">
            Ashaan Smart Driving Coach
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mt-4">
            Your personal AI-powered driving instructor. Learn road rules, practice scenarios, and master safe driving from home.
          </p>
        </div>

        <div className="space-y-8 bg-gray-800/50 p-8 rounded-3xl border border-gray-700 backdrop-blur-sm">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-400 ml-1">What should we call you?</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-400 ml-1">Create a password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-400 ml-1">Select your experience level</label>
            <div className="grid md:grid-cols-3 gap-4">
              {levels.map((l) => {
                const Icon = l.icon;
                const isSelected = level === l.id;
                return (
                  <motion.button
                    key={l.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setLevel(l.id)}
                    className={clsx(
                      "p-6 rounded-xl border text-left transition-all relative overflow-hidden group",
                      isSelected
                        ? "bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20"
                        : "bg-gray-900 border-gray-700 hover:border-gray-600"
                    )}
                  >
                    <div className="relative z-10 space-y-3">
                      <div className={clsx(
                        "p-3 rounded-lg w-fit",
                        isSelected ? "bg-white/20" : "bg-gray-800 group-hover:bg-gray-700"
                      )}>
                        <Icon className={clsx("w-6 h-6", isSelected ? "text-white" : "text-gray-400")} />
                      </div>
                      <div>
                        <h3 className={clsx(
                          "font-semibold text-lg mb-1",
                          isSelected ? "text-white" : "text-gray-200"
                        )}>
                          {l.title}
                        </h3>
                        <p className={clsx(
                          "text-sm leading-relaxed",
                          isSelected ? "text-blue-100" : "text-gray-400"
                        )}>
                          {l.description}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <motion.div
                        layoutId="selection-glow"
                        className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white p-6 rounded-xl font-bold text-xl shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Shield, GraduationCap, ArrowRight, Eye, EyeOff } from 'lucide-react';
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
];

const Landing = () => {
  const navigate = useNavigate();
  const { name, setName, level, setLevel, signUp } = useUser();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (level !== 'Beginner') {
      setLevel('Beginner');
    }
  }, [level, setLevel]);

  const handleStart = () => {
    if (name.trim() && password.trim()) {
      signUp(name, password, level);
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
            <p className="text-xs text-blue-400 ml-1">Password should contain at least 4 characters</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-600 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                title={showPassword ? "hide password" : "show password"}
              >
                {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-400 ml-1">Experience Level</label>
            <div className="space-y-4">
              {levels.map((l) => {
                const Icon = l.icon;
                return (
                  <div
                    key={l.id}
                    className="p-6 rounded-xl border text-left transition-all relative overflow-hidden group bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20 cursor-default"
                  >
                    <div className="relative z-10 space-y-3">
                      <div className="p-3 rounded-lg w-fit bg-white/20">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1 text-white">
                          {l.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-blue-100">
                          {l.description}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />
                  </div>
                );
              })}
              <p className="text-center text-gray-400 italic font-medium pt-2">"Every pro once started as a beginner"</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            disabled={!name.trim() || password.length < 4}
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

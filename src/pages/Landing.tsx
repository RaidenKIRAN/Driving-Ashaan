import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Car, GraduationCap, ArrowRight, Eye, EyeOff } from 'lucide-react';
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

const Landing = () => {
  const navigate = useNavigate();
  const { level, setLevel, signUp } = useUser();
  const [localName, setLocalName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  useEffect(() => {
    // Ensure level is Beginner on mount
    if (level !== 'Beginner') {
      setLevel('Beginner');
    }
  }, [level, setLevel]);

  const handleStart = () => {
    if (localName.trim() && password.trim()) {
      signUp(localName, password, level);
      navigate('/dashboard', { state: { isNewSignup: true } });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
      {/* Dynamic background element */}
      <motion.div 
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-gradient-to-bl from-blue-900/10 via-emerald-900/5 to-transparent rounded-full blur-[120px] pointer-events-none translate-x-1/4 -translate-y-1/4 opacity-50 dark:opacity-100"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full space-y-12 relative z-10"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.5)] border border-blue-400/30 backdrop-blur-sm"
          >
            <Car className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 dark:from-blue-400 to-emerald-600 dark:to-emerald-400 py-2">
            Create Your Account
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-2">
            Let's personalize your learning experience.
          </motion.p>
        </div>

        <motion.div variants={itemVariants} className="max-w-xl mx-auto w-full space-y-8 bg-gray-100 dark:bg-gray-800/60 p-8 rounded-3xl border border-gray-200 dark:border-gray-700/50 backdrop-blur-md shadow-2xl dark:shadow-black/40">
          
          {/* Name Input */}
          <div className="space-y-2 relative">
            <label className={clsx("block text-sm font-medium transition-colors ml-1", focusedInput === 'name' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400')}>
              What should we call you?
            </label>
            <div className="relative group">
              <div className={clsx("absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl blur opacity-0 transition duration-500", focusedInput === 'name' && "opacity-30")}></div>
              <input
                type="text"
                value={localName}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
                onChange={(e) => setLocalName(e.target.value)}
                placeholder="Enter your name"
                className="relative w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-6 py-4 text-lg focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2 relative">
            <div className="flex justify-between items-center ml-1">
               <label className={clsx("block text-sm font-medium transition-colors", focusedInput === 'password' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400')}>
                 Create a password
               </label>
               <span className={clsx("text-xs transition-colors", password.length > 0 && password.length < 4 ? "text-red-500 dark:text-red-400" : "text-gray-400 dark:text-gray-500")}>
                 Min 4 characters
               </span>
            </div>
            
            <div className="relative group">
              <div className={clsx("absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl blur opacity-0 transition duration-500", focusedInput === 'password' && "opacity-30")}></div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-6 py-4 text-lg focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 pr-12 focus:ring-2 focus:ring-blue-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  title={showPassword ? "hide password" : "show password"}
                >
                  {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-4 pt-2">
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">Experience Level</label>
            <div className="space-y-4">
              {levels.map((l) => {
                const Icon = l.icon;
                return (
                  <motion.div
                    key={l.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-xl border text-left transition-all relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-700 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-default"
                  >
                    <div className="relative z-10 space-y-3">
                      <div className="p-3 rounded-lg w-fit bg-white/20 backdrop-blur-sm border border-white/10">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-1 text-white flex items-center gap-2">
                          {l.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-blue-100">
                          {l.description}
                        </p>
                      </div>
                    </div>
                    {/* Shimmer effect */}
                    <motion.div 
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                      className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                    />
                  </motion.div>
                );
              })}
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 1 }} 
                className="text-center text-gray-500 dark:text-gray-400 italic font-medium pt-2"
              >
                "Every pro once started as a beginner"
              </motion.p>
            </div>
          </div>

          <motion.button
            whileHover={localName.trim() && password.length >= 4 ? { scale: 1.02, boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" } : {}}
            whileTap={localName.trim() && password.length >= 4 ? { scale: 0.98 } : {}}
            onClick={handleStart}
            disabled={!localName.trim() || password.length < 4}
            className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white p-6 rounded-xl font-bold text-xl shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all group overflow-hidden relative"
          >
            <span className="relative z-10">Start Your Journey</span>
            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Landing;

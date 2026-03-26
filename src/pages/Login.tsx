import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Car, LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { clsx } from 'clsx';

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

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError('');
    setPasswordError('');

    if (username.trim()) {
      const result = login(username, password);
      if (result.success) {
        navigate('/dashboard', { state: { isNewSignup: false } });
      } else {
        if (result.error === "couldn't find an account with this username") {
          setUsernameError(result.error);
        } else if (result.error === "incorrect password") {
          setPasswordError(result.error);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
      {/* Dynamic background element */}
      <motion.div 
        animate={{ 
          rotate: [0, -5, 5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-transparent rounded-full blur-[120px] pointer-events-none -translate-x-1/4 -translate-y-1/4 opacity-50 dark:opacity-100"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full space-y-8 relative z-10"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(59,130,246,0.5)] border border-blue-400/30 backdrop-blur-sm"
          >
            <Car className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-2xl font-bold text-gray-900 dark:text-white">
            D-ZONE Smart Driving Coach
          </motion.h1>
          <motion.h2 variants={itemVariants} className="text-xl text-blue-600 dark:text-blue-400 font-semibold">
            Welcome Back
          </motion.h2>
        </div>

        <motion.div variants={itemVariants} className="bg-gray-100 dark:bg-gray-800/60 p-8 rounded-3xl border border-gray-200 dark:border-gray-700/50 backdrop-blur-md shadow-2xl dark:shadow-black/40">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Username */}
            <div className="space-y-2 relative">
              <label className={clsx("block text-sm font-medium transition-colors ml-1", focusedInput === 'username' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400')}>
                Username
              </label>
              <div className="relative group">
                <div className={clsx("absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl blur opacity-0 transition duration-500", focusedInput === 'username' && "opacity-30")}></div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (usernameError) setUsernameError('');
                  }}
                  onFocus={() => setFocusedInput('username')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Enter your username"
                  className={clsx(
                    "relative w-full bg-white dark:bg-gray-900 border rounded-xl px-5 py-3 text-gray-900 dark:text-white focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2",
                    usernameError ? "border-red-500/50 focus:ring-red-500/50 text-red-600 dark:text-red-100" : "border-gray-200 dark:border-gray-700 focus:ring-blue-500/50"
                  )}
                  required
                />
              </div>
              {usernameError && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 dark:text-red-400 text-sm ml-1 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {usernameError}
                </motion.p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2 relative">
              <label className={clsx("block text-sm font-medium transition-colors ml-1", focusedInput === 'password' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400')}>
                Password
              </label>
              <div className="relative group">
                <div className={clsx("absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl blur opacity-0 transition duration-500", focusedInput === 'password' && "opacity-30")}></div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Enter your password"
                    className={clsx(
                      "w-full bg-white dark:bg-gray-900 border rounded-xl px-5 py-3 text-gray-900 dark:text-white focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 pr-12 focus:ring-2",
                      passwordError ? "border-red-500/50 focus:ring-red-500/50 text-red-600 dark:text-red-100" : "border-gray-200 dark:border-gray-700 focus:ring-blue-500/50"
                    )}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title={showPassword ? "hide password" : "show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              {passwordError && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 dark:text-red-400 text-sm ml-1 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {passwordError}
                </motion.p>
              )}
            </div>

            <motion.button
              whileHover={password.length >= 4 ? { scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" } : {}}
              whileTap={password.length >= 4 ? { scale: 0.98 } : {}}
              type="submit"
              disabled={password.length < 4}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white p-4 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all mt-6 group"
            >
              <LogIn className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Login Account</span>
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;

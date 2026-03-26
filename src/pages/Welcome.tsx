import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Car, UserPlus, LogIn } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
      {/* Dynamic background element */}
      <motion.div 
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-blue-900/10 via-emerald-900/10 to-transparent rounded-full blur-[100px] pointer-events-none opacity-50 dark:opacity-100"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full space-y-12 relative z-10"
      >
        <div className="text-center space-y-4">
          <motion.div
            variants={itemVariants}
            className="relative w-20 h-20 mx-auto mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl opacity-50 blur p-1"
            ></motion.div>
            <div className="relative w-full h-full bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 backdrop-blur-md border border-blue-400/20">
              <Car className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 dark:from-blue-400 to-emerald-600 dark:to-emerald-400 py-2"
          >
            D-ZONE Smart Driving Coach
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-4"
          >
            Your personal AI-powered driving instructor. Learn road rules, practice scenarios, and master safe driving from home.
          </motion.p>
        </div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup')}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-blue-500/20 w-full md:w-auto justify-center group"
          >
            <UserPlus className="w-6 h-6 group-hover:scale-110 transition-transform" />
            Sign Up
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, borderColor: "rgba(52, 211, 153, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700/80 backdrop-blur-md text-gray-900 dark:text-white px-8 py-4 rounded-xl text-lg font-semibold border border-gray-200 dark:border-gray-700 transition-all shadow-xl dark:shadow-black/20 w-full md:w-auto justify-center group"
          >
            <LogIn className="w-6 h-6 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-emerald-400 transition-colors" />
            Login
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;

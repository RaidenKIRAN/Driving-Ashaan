import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, UserPlus, LogIn } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

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

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup')}
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-blue-500/20 w-full md:w-auto justify-center"
          >
            <UserPlus className="w-6 h-6" />
            Sign Up
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl text-lg font-semibold border border-gray-700 transition-all w-full md:w-auto justify-center"
          >
            <LogIn className="w-6 h-6" />
            Login
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';

const Intro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4 overflow-hidden relative transition-colors duration-300">
      {/* Background ambient glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none opacity-50 dark:opacity-100"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        className="text-center relative z-10"
      >
        <div className="relative w-24 h-24 mx-auto mb-8">
          {/* Pulsing rings behind logo */}
          <motion.div
            animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 bg-blue-500 rounded-3xl opacity-20 dark:opacity-80"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1.8], opacity: [0.8, 0, 0] }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 bg-emerald-500 rounded-3xl opacity-20 dark:opacity-80"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)] border border-blue-400/30 backdrop-blur-sm relative z-10"
          >
            <Car className="w-12 h-12 text-white" />
          </motion.div>
        </div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 dark:from-blue-400 via-emerald-600 dark:via-emerald-400 to-blue-600 dark:to-blue-400 bg-300% animate-gradient"
        >
          D-ZONE Smart Driving Coach
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default Intro;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, LogIn, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { setName } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setName(username);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20"
          >
            <Car className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white">
            Ashaan Smart Driving Coach
          </h1>
          <h2 className="text-xl text-blue-400 font-semibold">User Login</h2>
        </div>

        <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700 backdrop-blur-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400 ml-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-5 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400 ml-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-5 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all mt-4"
            >
              <span>Login</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

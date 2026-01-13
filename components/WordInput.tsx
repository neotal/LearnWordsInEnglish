
import React, { useState } from 'react';
import { Sparkles, Play, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface WordInputProps {
  onStart: (words: string[]) => void;
}

const WordInput: React.FC<WordInputProps> = ({ onStart }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const words = inputValue
      .split(/[,|\n]/)
      .map(w => w.trim())
      .filter(w => w.length > 0);
    
    onStart(words);
  };

  return (
    <div className="backdrop-blur-xl bg-white/70 p-8 sm:p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles size={120} />
      </div>

      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block bg-gradient-to-tr from-pink-400 to-purple-500 p-4 rounded-3xl shadow-lg mb-6"
        >
          <Sparkles className="text-white" size={40} />
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          הרפתקת האנגלית שלי
        </h1>
        <p className="text-purple-800/70 text-xl font-medium">
          איזה מילים נלמד היום? ✨
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="group relative">
          <textarea
            dir="ltr"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Apple, Sun, Happy, Rainbow..."
            className="w-full h-48 p-6 bg-white/50 border-4 border-purple-100 rounded-[2rem] focus:ring-8 focus:ring-purple-200/50 focus:border-purple-400 outline-none transition-all text-2xl font-semibold placeholder:text-purple-200 text-purple-700 shadow-inner"
          />
          <div className="absolute bottom-4 right-4 text-purple-300 group-focus-within:text-purple-500 transition-colors">
            <PlusCircle size={28} />
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02, translateY: -5 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-black py-6 rounded-[2rem] text-2xl shadow-[0_10px_25px_rgba(236,72,153,0.3)] flex items-center justify-center gap-4 group transition-all"
        >
          <span>בואי נתחיל!</span>
          <Play className="group-hover:translate-x-[-5px] transition-transform" />
        </motion.button>
      </form>
    </div>
  );
};

export default WordInput;


import React from 'react';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative mb-12">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-48 h-48 rounded-[3rem] border-8 border-dashed border-purple-400/30"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 flex items-center justify-center text-purple-500"
        >
          <Wand2 size={80} />
        </motion.div>
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -100],
              x: [0, (i % 2 === 0 ? 50 : -50)],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="absolute top-1/2 left-1/2 text-2xl"
          >
            {['✨', '⭐', '🎈', '🍭'][i % 4]}
          </motion.div>
        ))}
      </div>
      
      <h2 className="text-4xl font-black text-purple-700 mb-4 animate-pulse">
        מכינה לך קסם...
      </h2>
      <p className="text-purple-400 text-xl font-bold">
        יוצרת שאלות במיוחד בשבילך!
      </p>
    </div>
  );
};

export default LoadingScreen;

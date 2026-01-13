
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResultBoardProps {
  score: number;
  total: number;
  onReset: () => void;
}

const ResultBoard: React.FC<ResultBoardProps> = ({ score, total, onReset }) => {
  const percentage = (score / total) * 100;

  useEffect(() => {
    const end = Date.now() + 3000;
    const colors = ['#ff69b4', '#9370db', '#40e0d0', '#ffd700'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  const getCelebrationText = () => {
    if (percentage === 100) return { title: "מלכת האנגלית!", sub: "פשוט מושלם, אין עלייך!" };
    if (percentage >= 80) return { title: "וואו, מדהים!", sub: "את כמעט שם, כל הכבוד!" };
    if (percentage >= 60) return { title: "עבודה מצוינת!", sub: "את משתפרת מרגע לרגע!" };
    return { title: "כל הכבוד על המאמץ!", sub: "בואי ננסה שוב ונצליח יותר!" };
  };

  const content = getCelebrationText();

  return (
    <div className="backdrop-blur-2xl bg-white/90 p-12 rounded-[4rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-t-8 border-white text-center relative overflow-hidden">
      <div className="absolute -top-10 -left-10 text-pink-100 rotate-12">
        <PartyPopper size={200} />
      </div>
      
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative z-10 flex justify-center mb-8"
      >
        <div className="bg-gradient-to-br from-yellow-300 to-orange-400 p-8 rounded-full shadow-2xl ring-8 ring-yellow-100">
          <Trophy size={120} className="text-white drop-shadow-md" />
        </div>
      </motion.div>

      <div className="relative z-10">
        <h2 className="text-5xl font-black text-purple-700 mb-2">{content.title}</h2>
        <p className="text-xl text-purple-400 font-bold mb-10">{content.sub}</p>
        
        <div className="bg-gradient-to-b from-purple-50 to-white p-8 rounded-[3rem] border-4 border-purple-100 mb-10 inline-block px-16">
          <div className="text-gray-400 font-bold text-lg mb-2 uppercase tracking-widest">הציון שלך</div>
          <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            {score}/{total}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="w-full bg-purple-600 text-white font-black py-6 rounded-3xl text-2xl shadow-xl flex items-center justify-center gap-4 hover:bg-purple-700 transition-colors"
        >
          <RotateCcw size={32} />
          שחקי שוב!
        </motion.button>
      </div>
    </div>
  );
};

export default ResultBoard;

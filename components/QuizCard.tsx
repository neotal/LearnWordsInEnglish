
import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { motion } from 'framer-motion';
import { Star, Check, X } from 'lucide-react';

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswer }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    setSelected(null);
    setIsCorrect(null);
  }, [question]);

  const handleOptionClick = (option: string) => {
    if (selected !== null) return;

    const correct = option === question.translation;
    setSelected(option);
    setIsCorrect(correct);
    onAnswer(correct);
  };

  return (
    <div className="backdrop-blur-md bg-white/80 p-8 sm:p-12 rounded-[3.5rem] shadow-2xl border-b-[12px] border-purple-200/50 flex flex-col items-center">
      <motion.div
        key={question.word}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="relative mb-12"
      >
        <div className="absolute -top-6 -right-6 text-yellow-400 animate-pulse">
          <Star size={48} fill="currentColor" />
        </div>
        <h2 className="text-6xl sm:text-7xl font-black text-purple-600 drop-shadow-sm tracking-tight">
          {question.word}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {question.options.map((option, idx) => {
          const isThisSelected = selected === option;
          const isThisCorrect = option === question.translation;
          
          let stateStyles = "bg-white border-white border-b-8 border-b-gray-200 text-purple-700 hover:border-b-purple-300";
          if (selected) {
            if (isThisCorrect) {
              stateStyles = "bg-green-400 border-green-500 border-b-green-600 text-white";
            } else if (isThisSelected) {
              stateStyles = "bg-red-400 border-red-500 border-b-red-600 text-white";
            } else {
              stateStyles = "bg-white border-gray-100 text-gray-300 opacity-50";
            }
          }

          return (
            <motion.button
              key={idx}
              whileHover={!selected ? { scale: 1.03, translateY: -2 } : {}}
              whileTap={!selected ? { scale: 0.95, translateY: 4 } : {}}
              disabled={selected !== null}
              onClick={() => handleOptionClick(option)}
              className={`relative py-6 px-4 rounded-3xl text-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-3 overflow-hidden ${stateStyles}`}
              dir="rtl"
            >
              {selected && isThisCorrect && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4">
                  <Check size={28} />
                </motion.div>
              )}
              {selected && isThisSelected && !isThisCorrect && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4">
                  <X size={28} />
                </motion.div>
              )}
              {option}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizCard;

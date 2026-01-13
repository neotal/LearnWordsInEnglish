
import React, { useState } from 'react';
import { generateQuizQuestions } from './services/geminiService';
import { AppStep, QuizQuestion } from './types';
import WordInput from './components/WordInput';
import QuizCard from './components/QuizCard';
import ResultBoard from './components/ResultBoard';
import LoadingScreen from './components/LoadingScreen';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.INPUT);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleStartQuiz = async (words: string[]) => {
    setStep(AppStep.LOADING);
    setError(null);
    try {
      const generated = await generateQuizQuestions(words);
      setQuestions(generated);
      setCurrentIdx(0);
      setScore(0);
      setStep(AppStep.PLAYING);
    } catch (err) {
      console.error(err);
      setError("אופס! משהו השתבש בקסם. נסי שוב! ✨");
      setStep(AppStep.INPUT);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(prev => prev + 1);
    
    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setStep(AppStep.RESULT);
      }
    }, 1500); // Slightly longer delay for the "juicy" feel
  };

  const resetGame = () => {
    setStep(AppStep.INPUT);
    setQuestions([]);
    setCurrentIdx(0);
    setScore(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {step === AppStep.INPUT && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full max-w-2xl"
          >
            <WordInput onStart={handleStartQuiz} />
            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-center mt-6 font-bold bg-white/80 p-3 rounded-2xl shadow-sm"
              >
                {error}
              </motion.p>
            )}
          </motion.div>
        )}

        {step === AppStep.LOADING && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoadingScreen />
          </motion.div>
        )}

        {step === AppStep.PLAYING && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-3xl"
          >
            <div className="mb-8 flex justify-between items-center text-purple-700 font-black text-xl">
              <span className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-3xl shadow-sm border-2 border-purple-100">
                שאלה {currentIdx + 1}/{questions.length}
              </span>
              <div className="flex gap-2">
                {[...Array(score)].map((_, i) => (
                  <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}>⭐</motion.span>
                ))}
              </div>
            </div>
            
            <div className="w-full h-5 bg-white/50 backdrop-blur-sm rounded-full mb-10 overflow-hidden p-1 shadow-inner">
              <motion.div 
                className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>

            <QuizCard 
              question={questions[currentIdx]} 
              onAnswer={handleAnswer} 
            />
          </motion.div>
        )}

        {step === AppStep.RESULT && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl"
          >
            <ResultBoard score={score} total={questions.length} onReset={resetGame} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

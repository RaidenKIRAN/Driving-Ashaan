import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessons } from '../data/lessons';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

const LessonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { markLessonComplete, level, setLevel, updateScore } = useUser();
  const lesson = lessons.find(l => l.id === id);
  const [currentStep, setCurrentStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasUpdatedScore, setHasUpdatedScore] = useState(false);
  const simulationFrameRef = useRef<HTMLIFrameElement | null>(null);
  const appliedSimulationResultsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (showResult && lesson?.type === 'quiz' && !hasUpdatedScore) {
      const questions = lesson.content?.questions || [];
      const passingScore = level === 'Intermediate' && lesson.id === '8' ? 30 : Math.ceil(questions.length * 0.75);
      const passed = quizScore >= passingScore;
      
      // Award points for attempting the quiz: 10 points per correct answer + 5 bonus if passed
      const scoreInPoints = (quizScore * 10) + (passed ? 5 : 0);
      updateScore(scoreInPoints); 
      setHasUpdatedScore(true);

      if (passed) {
        markLessonComplete(lesson.id);
        if (lesson.id === '8') {
          setLevel('Expert');
        } else if (level === 'Beginner') {
          setLevel('Intermediate');
        }
      }
    }
  }, [showResult, lesson, quizScore, level, setLevel, markLessonComplete, updateScore, hasUpdatedScore]);

  useEffect(() => {
    if (lesson?.type !== 'simulation') {
      return;
    }

    const frame = simulationFrameRef.current;
    if (!frame) {
      return;
    }

    const focusSimulation = () => {
      frame.focus();

      try {
        const canvas = frame.contentWindow?.document.querySelector<HTMLCanvasElement>('#unity-canvas');
        canvas?.focus();
      } catch {
        // Same-origin today, but keep this safe if the embed changes later.
      }
    };

    const timer = window.setTimeout(focusSimulation, 150);
    frame.addEventListener('load', focusSimulation);

    return () => {
      window.clearTimeout(timer);
      frame.removeEventListener('load', focusSimulation);
    };
  }, [lesson?.type]);

  useEffect(() => {
    if (lesson?.type !== 'simulation') {
      return;
    }

    const handleSimulationMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }

      const data = event.data;
      if (!data || data.source !== 'unity-simulation' || data.type !== 'session-result') {
        return;
      }

      if (data.lessonId && data.lessonId !== lesson.id) {
        return;
      }

      const score = Number(data.score) || 0;
      const resultKey = String(data.resultId || `${lesson.id}:${score}:${Boolean(data.completed)}`);
      if (appliedSimulationResultsRef.current.has(resultKey)) {
        return;
      }

      appliedSimulationResultsRef.current.add(resultKey);
      updateScore(score);

      if (data.completed) {
        markLessonComplete(lesson.id);
      }
    };

    window.addEventListener('message', handleSimulationMessage);
    return () => window.removeEventListener('message', handleSimulationMessage);
  }, [lesson, markLessonComplete, updateScore]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center transition-colors duration-300">
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold">Lesson not found</p>
          <button onClick={() => navigate('/dashboard')} className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">Return to Dashboard</button>
        </div>
      </div>
    );
  }

  const handleBack = () => navigate('/dashboard');
  
  const handleComplete = () => {
    if (lesson) markLessonComplete(lesson.id);
    navigate('/dashboard');
  };

  const renderContent = () => {
    switch (lesson.type) {
      case 'theory':
        return (
          <div className="space-y-8 pb-12">
            {lesson.content.sections.map((section: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                className="bg-gray-100 dark:bg-gray-800/80 p-8 rounded-3xl border border-gray-200 dark:border-gray-700/50 backdrop-blur-md shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-emerald-400 rounded-full" />
                  {section.title}
                </h3>
                {section.image && (
                  <div className="mb-6 bg-white dark:bg-white/5 p-6 rounded-2xl flex flex-col items-center justify-center min-h-[250px] shadow-inner border border-gray-200 dark:border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img 
                      src={section.image} 
                      alt={section.title} 
                      className="max-h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-105 relative z-10"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('placeholder')) {
                          target.src = `https://placehold.co/400x300/1e293b/3b82f6?text=${encodeURIComponent(section.title)}`;
                        }
                      }}
                    />
                    <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-widest relative z-10">Visual Aid</p>
                  </div>
                )}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{section.body}</p>
              </motion.div>
            ))}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center pt-8"
            >
               <motion.button 
                 whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                 whileTap={{ scale: 0.95 }}
                 onClick={handleComplete} 
                 className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg flex items-center gap-2"
               >
                 Complete Lesson
                 <CheckCircle className="w-5 h-5" />
               </motion.button>
            </motion.div>
          </div>
        );

      case 'quiz': {
        const questions = lesson.content?.questions;
        if (!questions || questions.length === 0) {
          return <div className="text-white p-10 text-center">No questions available for this quiz.</div>;
        }

        const currentQuestion = questions[currentStep];

        if (!currentQuestion && !showResult) {
           return <div className="text-white p-10 text-center">Error loading question.</div>;
        }
        
        const handleAnswer = (optionIndex: number) => {
           if (selectedOption !== null) return;
           setSelectedOption(optionIndex);
           if (optionIndex === currentQuestion.correct) {
             setQuizScore(s => s + 1);
           }
        };

        const nextQuestion = () => {
           setSelectedOption(null);
           if (currentStep < questions.length - 1) {
             setCurrentStep(s => s + 1);
           } else {
             setShowResult(true);
           }
        };

        if (showResult) {
           const passingScore = level === 'Intermediate' && lesson.id === '8' ? 30 : Math.ceil(questions.length * 0.75);
           const passed = quizScore >= passingScore;
           const wrongAnswers = questions.length - quizScore;
           const pointsEarned = (quizScore * 10) + (passed ? 5 : 0);

           return (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ type: "spring", bounce: 0.5 }}
               className="text-center space-y-8 py-12 bg-gray-800/50 rounded-3xl border border-gray-700/50 backdrop-blur-md"
             >
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                 className="text-6xl mb-4"
               >
                 {passed ? '🏆' : '📝'}
               </motion.div>
               <h2 className="text-4xl font-bold">{passed ? 'Quiz Passed!' : 'Quiz Completed'}</h2>
               <div className="flex justify-center gap-12 text-2xl font-bold">
                 <div className="flex flex-col items-center">
                   <span className="text-green-400 text-4xl">{quizScore}</span>
                   <span className="text-sm text-gray-400 font-medium uppercase mt-2">Correct</span>
                 </div>
                 <div className="w-px h-16 bg-gray-700" />
                 <div className="flex flex-col items-center">
                   <span className="text-red-400 text-4xl">{wrongAnswers}</span>
                   <span className="text-sm text-gray-400 font-medium uppercase mt-2">Wrong</span>
                 </div>
               </div>
               
               <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-2xl max-w-md mx-auto">
                 <p className="text-blue-400 font-semibold text-2xl">
                   +{pointsEarned} Points
                 </p>
                 <p className="text-xs text-blue-300 mt-1">({quizScore} × 10{passed ? ' + 5 bonus' : ''})</p>
               </div>
               
               <div className="pt-4">
                 {passed ? (
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="bg-green-500/10 border border-green-500/30 p-6 rounded-2xl max-w-md mx-auto"
                    >
                      <p className="text-green-400 font-semibold text-lg">
                        {lesson.id === '8' ? 'Outstanding! You are now an Expert level driver.' : "Excellent job! You've passed the quiz."}
                      </p>
                    </motion.div>
                 ) : (
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl max-w-md mx-auto"
                    >
                      <p className="text-red-400 font-semibold text-lg">
                        You need {passingScore} correct answers to pass. Keep practicing!
                      </p>
                    </motion.div>
                 )}
               </div>

               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={handleBack} 
                 className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold mt-8 shadow-lg shadow-blue-500/20"
               >
                 Return to Dashboard
               </motion.button>
             </motion.div>
           );
        }

        return (
          <div className="max-w-3xl mx-auto space-y-8 pb-12">
             <div className="flex justify-between items-center bg-gray-800/60 p-4 rounded-2xl border border-gray-700 backdrop-blur-sm">
               <div className="flex items-center gap-4">
                 <span className="text-sm font-medium text-gray-400">Progress</span>
                 <div className="w-48 h-2 bg-gray-900 rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-blue-500"
                     initial={{ width: 0 }}
                     animate={{ width: `${((currentStep) / questions.length) * 100}%` }}
                     transition={{ duration: 0.5 }}
                   />
                 </div>
                 <span className="text-sm font-bold text-white">{currentStep + 1} / {questions.length}</span>
               </div>
               <div className="flex items-center gap-2">
                 <Trophy className="w-4 h-4 text-emerald-400" />
                 <span className="text-emerald-400 font-bold">{quizScore} points</span>
               </div>
             </div>
             
             <div className="relative overflow-hidden min-h-[600px]">
               <AnimatePresence mode="wait">
                 <motion.div 
                   key={currentStep}
                   initial={{ x: 50, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   exit={{ x: -50, opacity: 0 }}
                   transition={{ type: "spring", stiffness: 200, damping: 20 }}
                   className="bg-gray-800/80 p-8 rounded-3xl border border-gray-700/50 backdrop-blur-md shadow-2xl absolute inset-0 overflow-y-auto"
                 >
                   <h3 className="text-2xl font-bold mb-8 text-white">{currentQuestion.question}</h3>
                   <div className="space-y-4">
                     {currentQuestion.options.map((option: string, idx: number) => {
                       const isSelected = selectedOption === idx;
                       const isCorrect = idx === currentQuestion.correct;
                       const showCorrect = selectedOption !== null && isCorrect;
                       const showWrong = isSelected && !isCorrect;
                       
                       let btnClass = "w-full p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden flex justify-between items-center group ";
                       if (selectedOption === null) {
                          btnClass += "bg-gray-900 border-gray-700 hover:border-blue-500 hover:bg-gray-800";
                       } else if (showCorrect) {
                          btnClass += "bg-green-900/30 border-green-500 text-green-100 shadow-[0_0_15px_rgba(34,197,94,0.2)]";
                       } else if (showWrong) {
                          btnClass += "bg-red-900/30 border-red-500 text-red-100";
                       } else {
                          btnClass += "bg-gray-900 border-gray-800 opacity-40 grayscale";
                       }

                       return (
                         <motion.button
                           key={idx}
                           whileHover={selectedOption === null ? { scale: 1.01, x: 5 } : {}}
                           whileTap={selectedOption === null ? { scale: 0.99 } : {}}
                           onClick={() => handleAnswer(idx)}
                           disabled={selectedOption !== null}
                           className={btnClass}
                         >
                           <span className="text-lg font-medium">{option}</span>
                           <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                             {showCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                             {showWrong && <XCircle className="w-5 h-5 text-red-400" />}
                           </div>
                         </motion.button>
                       );
                     })}
                   </div>
                 </motion.div>
               </AnimatePresence>
             </div>

             <AnimatePresence>
               {selectedOption !== null && (
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: 20 }}
                   className="flex justify-end pt-4"
                 >
                   <motion.button 
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={nextQuestion}
                     className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20"
                   >
                     {currentStep < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                     <ChevronRight className="w-5 h-5" />
                   </motion.button>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        );
      }

      case 'simulation':
        return (
           <div className="fixed inset-0 z-[60] bg-gray-900 overflow-hidden">
             {/* Full Screen Iframe */}
             <iframe 
               ref={simulationFrameRef}
               src={`/Latest%20Game%20file/index.html?lessonId=${encodeURIComponent(lesson.id)}`} 
               className="absolute inset-0 w-full h-full border-none"
               title="Unity Simulation"
               allow="autoplay; fullscreen; keyboard"
               tabIndex={0}
             />

             <div className="absolute bottom-8 right-8 z-10">
               <motion.button 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={handleComplete} 
                 className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-red-500/30 flex items-center gap-3 transition-all group"
               >
                 <XCircle className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                 End Simulation
               </motion.button>
             </div>
           </div>
        );

      default:
        return <div className="p-10 text-center text-gray-400">Unknown lesson type</div>;
    }
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 ${lesson.type === 'simulation' ? 'overflow-hidden' : ''}`}>
      {/* Header */}
      <header className={`${lesson.type === 'simulation' ? 'hidden' : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50'}`}>
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>
          
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{lesson.type}</span>
            <h1 className="font-bold truncate max-w-[200px] md:max-w-sm">{lesson.title}</h1>
          </div>

          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      <main className={lesson.type === 'simulation' ? '' : 'max-w-4xl mx-auto px-4 py-8'}>
        {renderContent()}
      </main>
    </div>
  );
};

// Polyfill Trophy if not imported above
function Trophy(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7c0 3.31 2.69 6 6 6s6-2.69 6-6V2Z" />
    </svg>
  );
}

export default LessonView;

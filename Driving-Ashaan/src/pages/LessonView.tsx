import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessons } from '../data/lessons';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle, MonitorPlay } from 'lucide-react';

const LessonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { markLessonComplete } = useUser();
  const lesson = lessons.find(l => l.id === id);
  const [currentStep, setCurrentStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  if (!lesson) {
    return <div className="text-white p-10">Lesson not found</div>;
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
          <div className="space-y-8">
            {lesson.content.sections.map((section: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-gray-800 p-6 rounded-2xl border border-gray-700"
              >
                <h3 className="text-xl font-bold mb-3 text-blue-400">{section.title}</h3>
                <p className="text-gray-300 leading-relaxed">{section.body}</p>
              </motion.div>
            ))}
            <div className="flex justify-center pt-8">
               <button onClick={handleBack} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                 Complete Lesson
               </button>
            </div>
          </div>
        );

      case 'quiz':
        const currentQuestion = lesson.content.questions[currentStep];
        
        const handleAnswer = (optionIndex: number) => {
           if (selectedOption !== null) return;
           setSelectedOption(optionIndex);
           if (optionIndex === currentQuestion.correct) {
             setQuizScore(s => s + 1);
           }
        };

        const nextQuestion = () => {
           setSelectedOption(null);
           if (currentStep < lesson.content.questions.length - 1) {
             setCurrentStep(s => s + 1);
           } else {
             setShowResult(true);
           }
        };

        if (showResult) {
           return (
             <div className="text-center space-y-6 py-10">
               <div className="text-6xl mb-4">
                 {quizScore === lesson.content.questions.length ? '🏆' : '📝'}
               </div>
               <h2 className="text-3xl font-bold">Quiz Complete!</h2>
               <p className="text-xl text-gray-400">You scored {quizScore} out of {lesson.content.questions.length}</p>
               <button onClick={handleBack} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold mt-4">
                 Back to Dashboard
               </button>
             </div>
           );
        }

        return (
          <div className="max-w-2xl mx-auto space-y-8">
             <div className="flex justify-between items-center text-sm text-gray-400">
               <span>Question {currentStep + 1} of {lesson.content.questions.length}</span>
               <span>Score: {quizScore}</span>
             </div>
             
             <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700">
               <h3 className="text-2xl font-bold mb-8">{currentQuestion.question}</h3>
               <div className="space-y-4">
                 {currentQuestion.options.map((option: string, idx: number) => {
                   const isSelected = selectedOption === idx;
                   const isCorrect = idx === currentQuestion.correct;
                   const showCorrect = selectedOption !== null && isCorrect;
                   const showWrong = isSelected && !isCorrect;
                   
                   let btnClass = "w-full p-4 rounded-xl border text-left transition-all relative overflow-hidden ";
                   if (selectedOption === null) {
                      btnClass += "bg-gray-900 border-gray-700 hover:border-blue-500 hover:bg-gray-800";
                   } else if (showCorrect) {
                      btnClass += "bg-green-900/50 border-green-500 text-green-200";
                   } else if (showWrong) {
                      btnClass += "bg-red-900/50 border-red-500 text-red-200";
                   } else {
                      btnClass += "bg-gray-900 border-gray-700 opacity-50";
                   }

                   return (
                     <button
                       key={idx}
                       onClick={() => handleAnswer(idx)}
                       disabled={selectedOption !== null}
                       className={btnClass}
                     >
                       <div className="flex justify-between items-center">
                         <span>{option}</span>
                         {showCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                         {showWrong && <XCircle className="w-5 h-5 text-red-400" />}
                       </div>
                     </button>
                   );
                 })}
               </div>
             </div>

             {selectedOption !== null && (
               <div className="flex justify-end">
                 <button 
                   onClick={nextQuestion}
                   className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                 >
                   {currentStep < lesson.content.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                 </button>
               </div>
             )}
          </div>
        );

      case 'simulation':
        return (
           <div className="space-y-6 text-center py-10">
             <div className="bg-gray-800 p-10 rounded-3xl border border-gray-700 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-emerald-900/20" />
                <MonitorPlay className="w-20 h-20 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold relative z-10">{lesson.content.scenario}</h3>
                <p className="text-gray-400 max-w-md mt-4 relative z-10">{lesson.content.instruction}</p>
                <div className="mt-8 px-4 py-2 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-lg text-sm relative z-10">
                  Simulation Placeholder: In a real app, this would be an interactive Canvas or 3D scene.
                </div>
             </div>
             <button onClick={handleComplete} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold">
               End Simulation
             </button>
           </div>
        );

      default:
        return <div>Unknown lesson type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
             <span className="px-3 py-1 bg-blue-900/50 text-blue-400 rounded-full text-xs font-medium border border-blue-500/20">
               {lesson.type.toUpperCase()}
             </span>
             <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-xs font-medium border border-gray-700">
               {lesson.duration}
             </span>
          </div>
          <h1 className="text-4xl font-bold mb-2">{lesson.title}</h1>
          <p className="text-gray-400 text-lg">{lesson.description}</p>
        </header>

        {renderContent()}
      </div>
    </div>
  );
};

export default LessonView;

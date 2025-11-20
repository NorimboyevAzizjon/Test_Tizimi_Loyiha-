import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Timer from '../common/Timer';

const TestInterface = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeUp, setTimeUp] = useState(false);

  // Mock test data
  const test = {
    id: parseInt(testId),
    title: 'Matematika Test 1',
    duration: 45 * 60, // 45 minutes in seconds
    questions: [
      {
        id: 1,
        text: "2 + 2 nechaga teng?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1
      },
      {
        id: 2,
        text: "Teng yonli uchburchakning nechta teng tomoni bor?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1
      },
      {
        id: 3,
        text: "a² - b² = ?",
        options: ["(a-b)(a+b)", "(a+b)²", "(a-b)²", "a²+b²"],
        correctAnswer: 0
      }
    ]
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    const score = test.questions.reduce((total, question) => {
      return total + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);

    // Navigate to results
    navigate('/student/results', { 
      state: { 
        score, 
        total: test.questions.length,
        testTitle: test.title 
      } 
    });
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmit();
  };

  const progress = ((currentQuestion + 1) / test.questions.length) * 100;

  if (timeUp) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-6xl mb-4">⏰</div>
          <h2 className="text-2xl font-bold mb-4">Vaqt tugadi!</h2>
          <p className="text-gray-600 mb-6">Test avtomatik ravishda yakunlandi.</p>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Natijani ko'rish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Test header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">{test.title}</h1>
              <p className="text-gray-600">
                Savol {currentQuestion + 1} / {test.questions.length}
              </p>
            </div>
            <Timer initialTime={test.duration} onTimeUp={handleTimeUp} />
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-6">
            {test.questions[currentQuestion].text}
          </h2>
          
          <div className="space-y-3">
            {test.questions[currentQuestion].options.map((option, index) => (
              <label 
                key={index}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                  answers[test.questions[currentQuestion].id] === index
                    ? 'bg-blue-50 border-blue-500'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${test.questions[currentQuestion].id}`}
                  checked={answers[test.questions[currentQuestion].id] === index}
                  onChange={() => handleAnswerSelect(test.questions[currentQuestion].id, index)}
                  className="mr-3"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className={`px-6 py-2 rounded ${
              currentQuestion === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            ← Oldingi
          </button>

          <div className="flex space-x-2">
            {test.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded text-sm ${
                  currentQuestion === index
                    ? 'bg-blue-500 text-white'
                    : answers[test.questions[index].id] !== undefined
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === test.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
            >
              Yakunlash
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
            >
              Keyingi →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestInterface;
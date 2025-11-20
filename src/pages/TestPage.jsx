import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTest, addResult } from '../store/testSlice';
import Timer from '../components/common/Timer';

const TestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { currentTest } = useSelector(state => state.test);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);

  const mockTest = {
    id: parseInt(testId),
    title: 'Matematika Test 1',
    subject: 'Matematika',
    duration: 45,
    totalQuestions: 5,
    instructions: [
      'Test 45 daqiqa davom etadi',
      'Jami 5 ta savol mavjud',
      'Har bir savolga faqat bitta javob berish mumkin',
      'Vaqt tugagach test avtomatik yakunlanadi',
      'Orqaga qaytish mumkin emas'
    ],
    questions: [
      {
        id: 1,
        text: "2 + 2 nechaga teng?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
        points: 1
      },
      {
        id: 2,
        text: "Teng yonli uchburchakning nechta teng tomoni bor?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1,
        points: 1
      },
      {
        id: 3,
        text: "a² - b² = ?",
        options: ["(a-b)(a+b)", "(a+b)²", "(a-b)²", "a²+b²"],
        correctAnswer: 0,
        points: 2
      },
      {
        id: 4,
        text: "Kvadrat tenglama ildizlarini topish formulasi?",
        options: [
          "x = (-b ± √(b²-4ac))/2a",
          "x = (b ± √(b²-4ac))/2a", 
          "x = (-b ± √(b²+4ac))/2a",
          "x = (-b ± √(b²-4ac))/a"
        ],
        correctAnswer: 0,
        points: 2
      },
      {
        id: 5,
        text: "π (pi) ning qiymati qancha?",
        options: ["3.14", "2.71", "1.61", "3.16"],
        correctAnswer: 0,
        points: 1
      }
    ]
  };

  useEffect(() => {
    dispatch(setCurrentTest(mockTest));
    setTimeLeft(mockTest.duration * 60);
  }, [dispatch, testId]);

  const startTest = () => {
    setTestStarted(true);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        selectedAnswer: answerIndex,
        timestamp: new Date().toISOString()
      }
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockTest.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleTimeUp = () => {
    finishTest();
  };

  const finishTest = () => {
    setTestFinished(true);
    
    const score = mockTest.questions.reduce((total, question) => {
      const userAnswer = answers[question.id]?.selectedAnswer;
      return total + (userAnswer === question.correctAnswer ? question.points : 0);
    }, 0);

    const totalPoints = mockTest.questions.reduce((total, question) => total + question.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);

    const result = {
      id: Date.now(),
      testId: mockTest.id,
      testTitle: mockTest.title,
      studentId: user.id,
      studentName: user.name,
      score,
      totalPoints,
      percentage,
      answers,
      completedAt: new Date().toISOString(),
      timeSpent: mockTest.duration * 60 - timeLeft
    };

    dispatch(addResult(result));

    setTimeout(() => {
      navigate('/student/results', { 
        state: { 
          result,
          fromTest: true
        } 
      });
    }, 2000);
  };

  const currentQuestion = mockTest.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockTest.questions.length) * 100;

  const styles = {
    introPage: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    introContainer: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '32px',
      maxWidth: '600px',
      width: '100%',
      boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)'
    },
    introHeader: {
      textAlign: 'center',
      marginBottom: '24px'
    },
    introTitle: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '8px'
    },
    introSubtitle: {
      fontSize: '18px',
      color: '#6b7280'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginBottom: '24px'
    },
    infoCard: {
      padding: '16px',
      borderRadius: '8px'
    },
    infoContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    infoIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px'
    },
    infoText: {
      display: 'flex',
      flexDirection: 'column'
    },
    infoLabel: {
      fontSize: '14px',
      color: '#6b7280'
    },
    infoValue: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937'
    },
    instructions: {
      backgroundColor: '#fef3c7',
      border: '1px solid #fcd34d',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '24px'
    },
    instructionsTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#92400e',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    instructionsList: {
      margin: 0,
      paddingLeft: '16px',
      color: '#92400e'
    },
    startButton: {
      backgroundColor: '#10b981',
      color: 'white',
      padding: '16px 32px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'block',
      margin: '0 auto'
    },
    startButtonHover: {
      backgroundColor: '#059669',
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)'
    },
    testPage: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    },
    testHeader: {
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid #e5e7eb'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    backButton: {
      color: '#6b7280',
      background: 'none',
      border: 'none',
      fontSize: '14px',
      cursor: 'pointer',
      padding: '8px'
    },
    headerTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    headerSubtitle: {
      color: '#6b7280',
      fontSize: '14px'
    },
    progressBar: {
      width: '100%',
      height: '4px',
      backgroundColor: '#e5e7eb',
      marginTop: '8px'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#3b82f6',
      transition: 'width 0.3s ease'
    },
    testContent: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '24px'
    },
    questionCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '24px'
    },
    questionText: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '24px'
    },
    navigationDots: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '24px'
    },
    dot: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      border: 'none',
      transition: 'all 0.2s'
    },
    dotCurrent: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    dotAnswered: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    dotUnanswered: {
      backgroundColor: '#f3f4f6',
      color: '#6b7280'
    },
    options: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    option: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    optionSelected: {
      backgroundColor: '#eff6ff',
      borderColor: '#3b82f6'
    },
    optionHover: {
      backgroundColor: '#f9fafb',
      borderColor: '#d1d5db'
    },
    optionRadio: {
      marginRight: '12px',
      width: '20px',
      height: '20px'
    },
    optionText: {
      fontSize: '16px',
      color: '#374151',
      fontWeight: '500'
    },
    navigation: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '24px'
    },
    navButton: {
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    prevButton: {
      backgroundColor: '#6b7280',
      color: 'white'
    },
    nextButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    submitButton: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    disabledButton: {
      backgroundColor: '#d1d5db',
      color: '#9ca3af',
      cursor: 'not-allowed'
    },
    stats: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#6b7280',
      fontSize: '14px'
    },
    quickStats: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '20px',
      fontWeight: '700',
      marginBottom: '4px'
    },
    statLabel: {
      fontSize: '12px',
      color: '#6b7280'
    },
    finishedPage: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #86efac 0%, #4ade80 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    finishedContainer: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '32px',
      maxWidth: '400px',
      width: '100%',
      textAlign: 'center',
      boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)'
    },
    finishedIcon: {
      fontSize: '48px',
      marginBottom: '16px',
      animation: 'bounce 2s infinite'
    },
    finishedTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '8px'
    },
    finishedText: {
      color: '#6b7280',
      marginBottom: '16px'
    },
    spinner: {
      width: '32px',
      height: '32px',
      border: '4px solid #f3f4f6',
      borderTop: '4px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto'
    }
  };

  if (!testStarted) {
    return (
      <div style={styles.introPage}>
        <div style={styles.introContainer}>
          <div style={styles.introHeader}>
            <h1 style={styles.introTitle}>{mockTest.title}</h1>
            <p style={styles.introSubtitle}>{mockTest.subject}</p>
          </div>

          <div style={styles.infoGrid}>
            <div style={{...styles.infoCard, backgroundColor: '#eff6ff'}}>
              <div style={styles.infoContent}>
                <div style={{...styles.infoIcon, backgroundColor: '#dbeafe'}}>⏱</div>
                <div style={styles.infoText}>
                  <span style={styles.infoLabel}>Vaqt</span>
                  <span style={styles.infoValue}>{mockTest.duration} daqiqa</span>
                </div>
              </div>
            </div>

            <div style={{...styles.infoCard, backgroundColor: '#f0fdf4'}}>
              <div style={styles.infoContent}>
                <div style={{...styles.infoIcon, backgroundColor: '#dcfce7'}}>❓</div>
                <div style={styles.infoText}>
                  <span style={styles.infoLabel}>Savollar</span>
                  <span style={styles.infoValue}>{mockTest.totalQuestions} ta</span>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.instructions}>
            <h3 style={styles.instructionsTitle}>
              <span>📋</span>
              Test qoidalari
            </h3>
            <ul style={styles.instructionsList}>
              {mockTest.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>

          <div style={{textAlign: 'center'}}>
            <button
              onClick={startTest}
              style={styles.startButton}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = styles.startButtonHover.backgroundColor;
                e.target.style.transform = styles.startButtonHover.transform;
                e.target.style.boxShadow = styles.startButtonHover.boxShadow;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = styles.startButton.backgroundColor;
                e.target.style.transform = 'none';
                e.target.style.boxShadow = 'none';
              }}
            >
              Testni Boshlash 🚀
            </button>
            <p style={{color: '#6b7280', marginTop: '12px', fontSize: '14px'}}>
              Testni boshlaganingizdan so'ng, vaqt hisoblana boshlaydi
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (testFinished) {
    return (
      <div style={styles.finishedPage}>
        <div style={styles.finishedContainer}>
          <div style={styles.finishedIcon}>🎉</div>
          <h2 style={styles.finishedTitle}>Test Yakunlandi!</h2>
          <p style={styles.finishedText}>
            Natijalaringiz hisoblanmoqda...
          </p>
          <div style={styles.spinner}></div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.testPage}>
      <div style={styles.testHeader}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <button
              onClick={() => navigate('/student/tests')}
              style={styles.backButton}
            >
              ← Ortga
            </button>
            <div>
              <h1 style={styles.headerTitle}>{mockTest.title}</h1>
              <p style={styles.headerSubtitle}>
                Savol {currentQuestionIndex + 1} / {mockTest.questions.length}
              </p>
            </div>
          </div>
          
          <Timer initialTime={mockTest.duration * 60} onTimeUp={handleTimeUp} />
        </div>

        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${progress}%`
            }}
          ></div>
        </div>
      </div>

      <div style={styles.testContent}>
        <div style={styles.questionCard}>
          <div style={styles.questionText}>
            {currentQuestionIndex + 1}. {currentQuestion.text}
          </div>
          
          <div style={styles.navigationDots}>
            {mockTest.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                style={{
                  ...styles.dot,
                  ...(index === currentQuestionIndex ? styles.dotCurrent :
                      answers[mockTest.questions[index].id] ? styles.dotAnswered : styles.dotUnanswered)
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div style={styles.options}>
            {currentQuestion.options.map((option, index) => (
              <label 
                key={index}
                style={{
                  ...styles.option,
                  ...(answers[currentQuestion.id]?.selectedAnswer === index ? styles.optionSelected : {})
                }}
                onMouseOver={(e) => {
                  if (answers[currentQuestion.id]?.selectedAnswer !== index) {
                    e.target.style.backgroundColor = styles.optionHover.backgroundColor;
                    e.target.style.borderColor = styles.optionHover.borderColor;
                  }
                }}
                onMouseOut={(e) => {
                  if (answers[currentQuestion.id]?.selectedAnswer !== index) {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.borderColor = styles.option.borderColor;
                  }
                }}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  checked={answers[currentQuestion.id]?.selectedAnswer === index}
                  onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                  style={styles.optionRadio}
                />
                <span style={styles.optionText}>
                  {String.fromCharCode(65 + index)}. {option}
                </span>
              </label>
            ))}
          </div>

          <div style={styles.navigation}>
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              style={{
                ...styles.navButton,
                ...styles.prevButton,
                ...(currentQuestionIndex === 0 ? styles.disabledButton : {})
              }}
            >
              ← Oldingi
            </button>

            <div style={styles.stats}>
              <span>
                {Object.keys(answers).length} / {mockTest.questions.length} javob berilgan
              </span>
              
              {currentQuestionIndex === mockTest.questions.length - 1 ? (
                <button
                  onClick={finishTest}
                  style={{...styles.navButton, ...styles.submitButton}}
                >
                  Testni Yakunlash ✅
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  style={{...styles.navButton, ...styles.nextButton}}
                >
                  Keyingi →
                </button>
              )}
            </div>
          </div>
        </div>

        <div style={styles.quickStats}>
          <div style={styles.statsGrid}>
            <div>
              <div style={{...styles.statNumber, color: '#2563eb'}}>
                {currentQuestionIndex + 1}
              </div>
              <div style={styles.statLabel}>Joriy savol</div>
            </div>
            <div>
              <div style={{...styles.statNumber, color: '#16a34a'}}>
                {Object.keys(answers).length}
              </div>
              <div style={styles.statLabel}>Javob berilgan</div>
            </div>
            <div>
              <div style={{...styles.statNumber, color: '#6b7280'}}>
                {mockTest.questions.length - Object.keys(answers).length}
              </div>
              <div style={styles.statLabel}>Qolgan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
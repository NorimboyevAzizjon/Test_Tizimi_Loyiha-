import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const { score, total, testTitle } = location.state || { score: 0, total: 0, testTitle: 'Test' };

  const [activeTab, setActiveTab] = useState('summary');

  const detailedResults = [
    { 
      question: "2 + 2 nechaga teng?", 
      yourAnswer: "4", 
      correctAnswer: "4", 
      isCorrect: true 
    },
    { 
      question: "Teng yonli uchburchakning nechta teng tomoni bor?", 
      yourAnswer: "3", 
      correctAnswer: "2", 
      isCorrect: false 
    },
    { 
      question: "a² - b² = ?", 
      yourAnswer: "(a-b)(a+b)", 
      correctAnswer: "(a-b)(a+b)", 
      isCorrect: true 
    },
  ];

  const percentage = Math.round((score / total) * 100);
  
  const getGradeInfo = () => {
    if (percentage >= 90) return { grade: 'Aʼlo', color: '#16a34a', bgColor: '#dcfce7' };
    if (percentage >= 70) return { grade: 'Yaxshi', color: '#2563eb', bgColor: '#dbeafe' };
    if (percentage >= 50) return { grade: 'Qoniqarli', color: '#d97706', bgColor: '#fef3c7' };
    return { grade: 'Qoniqarsiz', color: '#dc2626', bgColor: '#fef2f2' };
  };

  const gradeInfo = getGradeInfo();

  const styles = {
    page: {
      padding: '24px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    },
    container: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '16px'
    },
    summaryCard: {
      backgroundColor: 'white',
      padding: '32px',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      marginBottom: '24px'
    },
    gradeCircle: {
      width: '96px',
      height: '96px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px auto'
    },
    gradePercentage: {
      fontSize: '24px',
      fontWeight: '700'
    },
    gradeText: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '8px'
    },
    scoreText: {
      color: '#6b7280',
      marginBottom: '24px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      maxWidth: '400px',
      margin: '0 auto'
    },
    statItem: {
      textAlign: 'center'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '4px'
    },
    statLabel: {
      color: '#6b7280',
      fontSize: '14px'
    },
    tabsContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '24px'
    },
    tabsHeader: {
      borderBottom: '1px solid #e5e7eb'
    },
    tabsNav: {
      display: 'flex',
      margin: 0,
      padding: 0,
      listStyle: 'none'
    },
    tab: {
      padding: '16px 24px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      borderBottom: '2px solid transparent',
      transition: 'all 0.2s'
    },
    tabActive: {
      color: '#2563eb',
      borderBottomColor: '#2563eb'
    },
    tabInactive: {
      color: '#6b7280'
    },
    tabContent: {
      padding: '24px'
    },
    summaryStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginBottom: '24px'
    },
    summaryStat: {
      textAlign: 'center',
      padding: '20px',
      borderRadius: '8px'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '8px'
    },
    progressFill: {
      height: '100%',
      borderRadius: '4px',
      transition: 'width 0.3s ease'
    },
    analysisGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginTop: '16px'
    },
    analysisCard: {
      padding: '16px',
      borderRadius: '8px'
    },
    analysisTitle: {
      fontWeight: '600',
      marginBottom: '8px'
    },
    analysisList: {
      margin: 0,
      paddingLeft: '16px',
      fontSize: '14px'
    },
    questionItem: {
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px'
    },
    questionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '8px'
    },
    questionText: {
      fontWeight: '500',
      flex: 1,
      marginRight: '12px'
    },
    answerStatus: {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500'
    },
    correctAnswer: {
      backgroundColor: '#dcfce7',
      color: '#16a34a'
    },
    incorrectAnswer: {
      backgroundColor: '#fef2f2',
      color: '#dc2626'
    },
    answersGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      fontSize: '14px'
    },
    answerLabel: {
      color: '#6b7280'
    },
    answerValue: {
      fontWeight: '500'
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      marginTop: '24px'
    },
    actionButton: {
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    primaryButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    secondaryButton: {
      backgroundColor: '#6b7280',
      color: 'white'
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Test Yakunlandi</h1>
          <p style={styles.subtitle}>{testTitle}</p>
        </div>

        <div style={styles.summaryCard}>
          <div style={{...styles.gradeCircle, backgroundColor: gradeInfo.bgColor}}>
            <span style={{...styles.gradePercentage, color: gradeInfo.color}}>
              {percentage}%
            </span>
          </div>
          
          <h2 style={{...styles.gradeText, color: gradeInfo.color}}>{gradeInfo.grade}</h2>
          <p style={styles.scoreText}>
            Siz {total} ta savoldan {score} tasiga to'g'ri javob berdingiz
          </p>
          
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={{...styles.statValue, color: '#16a34a'}}>{score}</div>
              <div style={styles.statLabel}>To'g'ri javob</div>
            </div>
            <div style={styles.statItem}>
              <div style={{...styles.statValue, color: '#dc2626'}}>{total - score}</div>
              <div style={styles.statLabel}>Noto'g'ri javob</div>
            </div>
            <div style={styles.statItem}>
              <div style={{...styles.statValue, color: '#2563eb'}}>{total}</div>
              <div style={styles.statLabel}>Jami savol</div>
            </div>
          </div>
        </div>

        <div style={styles.tabsContainer}>
          <div style={styles.tabsHeader}>
            <nav style={styles.tabsNav}>
              <div
                onClick={() => setActiveTab('summary')}
                style={{
                  ...styles.tab,
                  ...(activeTab === 'summary' ? styles.tabActive : styles.tabInactive)
                }}
              >
                Umumiy ko'rinish
              </div>
              <div
                onClick={() => setActiveTab('details')}
                style={{
                  ...styles.tab,
                  ...(activeTab === 'details' ? styles.tabActive : styles.tabInactive)
                }}
              >
                Batafsil natijalar
              </div>
              <div
                onClick={() => setActiveTab('analysis')}
                style={{
                  ...styles.tab,
                  ...(activeTab === 'analysis' ? styles.tabActive : styles.tabInactive)
                }}
              >
                Tahlil
              </div>
            </nav>
          </div>

          <div style={styles.tabContent}>
            {activeTab === 'summary' && (
              <div>
                <h3 style={{fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1f2937'}}>
                  Test statistikasi
                </h3>
                <div style={styles.summaryStats}>
                  <div style={{...styles.summaryStat, backgroundColor: '#dcfce7'}}>
                    <div style={{...styles.statValue, color: '#16a34a'}}>{score}</div>
                    <div style={styles.statLabel}>To'g'ri javob</div>
                  </div>
                  <div style={{...styles.summaryStat, backgroundColor: '#fef2f2'}}>
                    <div style={{...styles.statValue, color: '#dc2626'}}>{total - score}</div>
                    <div style={styles.statLabel}>Xato javob</div>
                  </div>
                  <div style={{...styles.summaryStat, backgroundColor: '#dbeafe'}}>
                    <div style={{...styles.statValue, color: '#2563eb'}}>{percentage}%</div>
                    <div style={styles.statLabel}>Umumiy ball</div>
                  </div>
                  <div style={{...styles.summaryStat, backgroundColor: '#f3e8ff'}}>
                    <div style={{...styles.statValue, color: '#9333ea'}}>{gradeInfo.grade}</div>
                    <div style={styles.statLabel}>Baholash</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div>
                <h3 style={{fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1f2937'}}>
                  Savolma-savol natijalar
                </h3>
                {detailedResults.map((result, index) => (
                  <div key={index} style={styles.questionItem}>
                    <div style={styles.questionHeader}>
                      <h4 style={styles.questionText}>
                        Savol {index + 1}: {result.question}
                      </h4>
                      <span style={{
                        ...styles.answerStatus,
                        ...(result.isCorrect ? styles.correctAnswer : styles.incorrectAnswer)
                      }}>
                        {result.isCorrect ? 'Toʻgʻri' : 'Notoʻgʻri'}
                      </span>
                    </div>
                    <div style={styles.answersGrid}>
                      <div>
                        <span style={styles.answerLabel}>Sizning javobingiz:</span>
                        <p style={{
                          ...styles.answerValue,
                          color: result.isCorrect ? '#16a34a' : '#dc2626'
                        }}>
                          {result.yourAnswer}
                        </p>
                      </div>
                      <div>
                        <span style={styles.answerLabel}>To'g'ri javob:</span>
                        <p style={{...styles.answerValue, color: '#16a34a'}}>
                          {result.correctAnswer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'analysis' && (
              <div>
                <h3 style={{fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1f2937'}}>
                  Test tahlili
                </h3>
                <div style={{marginBottom: '20px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '4px'}}>
                    <span>Umumiy natija</span>
                    <span>{percentage}%</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div 
                      style={{
                        ...styles.progressFill,
                        backgroundColor: '#3b82f6',
                        width: `${percentage}%`
                      }}
                    ></div>
                  </div>
                </div>
                
                <div style={styles.analysisGrid}>
                  <div style={{...styles.analysisCard, backgroundColor: '#fef3c7'}}>
                    <h4 style={styles.analysisTitle}>Kuchli tomonlaringiz</h4>
                    <ul style={styles.analysisList}>
                      <li>Algebraik ifodalar</li>
                      <li>Arifmetik amallar</li>
                    </ul>
                  </div>
                  <div style={{...styles.analysisCard, backgroundColor: '#fef2f2'}}>
                    <h4 style={styles.analysisTitle}>Takomillashtirish kerak</h4>
                    <ul style={styles.analysisList}>
                      <li>Geometrik tushunchalar</li>
                      <li>Masalalarni tez yechish</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={styles.actions}>
          <button style={{...styles.actionButton, ...styles.primaryButton}}>
            Test qayta ko'rib chiqish
          </button>
          <button style={{...styles.actionButton, ...styles.secondaryButton}}>
            Boshqa testlar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
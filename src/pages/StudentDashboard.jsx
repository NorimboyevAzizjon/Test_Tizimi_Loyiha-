import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const { user } = useSelector(state => state.auth);

  const styles = {
    page: {
      padding: '24px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    },
    header: {
      marginBottom: '32px'
    },
    title: {
      fontSize: '30px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '16px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    card: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    viewAllLink: {
      color: '#3b82f6',
      fontSize: '14px',
      textDecoration: 'none',
      fontWeight: '500'
    },
    testItem: {
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      transition: 'all 0.2s'
    },
    testItemHover: {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    testHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '8px'
    },
    testTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    testMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#6b7280',
      fontSize: '14px',
      marginBottom: '12px'
    },
    testActions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    startButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    startButtonHover: {
      backgroundColor: '#2563eb'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px'
    },
    statItem: {
      textAlign: 'center',
      padding: '20px',
      borderRadius: '8px'
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
    scoreGood: {
      color: '#10b981'
    },
    scoreAverage: {
      color: '#f59e0b'
    }
  };

  const upcomingTests = [
    { 
      id: 1, 
      title: 'Matematika Test 1', 
      date: '15.12.2023', 
      duration: '45 min', 
      questions: 20 
    },
    { 
      id: 2, 
      title: 'Fizika Test 2', 
      date: '17.12.2023', 
      duration: '60 min', 
      questions: 25 
    },
  ];

  const recentResults = [
    { test: 'Matematika Test 3', score: 85, date: '10.12.2023' },
    { test: 'Fizika Test 1', score: 92, date: '05.12.2023' },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Xush kelibsiz, {user?.name}!</h1>
        <p style={styles.subtitle}>
          {user?.group} guruhi o'quvchisi
        </p>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Kelayotgan Testlar</h3>
            <Link to="/student/tests" style={styles.viewAllLink}>
              Barchasini ko'rish →
            </Link>
          </div>
          
          <div>
            {upcomingTests.map((test) => (
              <div 
                key={test.id} 
                style={styles.testItem}
                onMouseOver={(e) => e.target.style.boxShadow = styles.testItemHover.boxShadow}
                onMouseOut={(e) => e.target.style.boxShadow = 'none'}
              >
                <div style={styles.testHeader}>
                  <h4 style={styles.testTitle}>{test.title}</h4>
                </div>
                <div style={styles.testMeta}>
                  <span>📅 {test.date}</span>
                  <span>⏱ {test.duration}</span>
                  <span>❓ {test.questions} savol</span>
                </div>
                <div style={styles.testActions}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '14px'}}>
                    <span>Urinishlar: 0 / 1</span>
                  </div>
                  <Link
                    to={`/student/test/${test.id}`}
                    style={styles.startButton}
                    onMouseOver={(e) => e.target.style.backgroundColor = styles.startButtonHover.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = styles.startButton.backgroundColor}
                  >
                    Boshlash
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>So'nggi Natijalar</h3>
            <Link to="/student/results" style={styles.viewAllLink}>
              Barchasini ko'rish →
            </Link>
          </div>
          
          <div>
            {recentResults.map((result, index) => (
              <div key={index} style={styles.testItem}>
                <div style={styles.testHeader}>
                  <h4 style={styles.testTitle}>{result.test}</h4>
                  <span style={{
                    ...styles.statValue,
                    ...(result.score >= 90 ? styles.scoreGood : styles.scoreAverage)
                  }}>
                    {result.score} ball
                  </span>
                </div>
                <div style={styles.testMeta}>
                  <span>📅 {result.date}</span>
                  <span style={{
                    color: result.score >= 90 ? '#10b981' : 
                           result.score >= 70 ? '#3b82f6' : '#f59e0b',
                    fontWeight: '500'
                  }}>
                    {result.score >= 90 ? 'Aʼlo' : 
                     result.score >= 70 ? 'Yaxshi' : 'Qoniqarli'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Statistika</h3>
        <div style={styles.statsGrid}>
          <div style={{...styles.statItem, backgroundColor: '#dbeafe'}}>
            <div style={{...styles.statValue, color: '#2563eb'}}>12</div>
            <div style={styles.statLabel}>Bajarilgan test</div>
          </div>
          <div style={{...styles.statItem, backgroundColor: '#dcfce7'}}>
            <div style={{...styles.statValue, color: '#16a34a'}}>84.5</div>
            <div style={styles.statLabel}>O'rtacha ball</div>
          </div>
          <div style={{...styles.statItem, backgroundColor: '#f3e8ff'}}>
            <div style={{...styles.statValue, color: '#9333ea'}}>3</div>
            <div style={styles.statLabel}>Aʼlo baholar</div>
          </div>
          <div style={{...styles.statItem, backgroundColor: '#ffedd5'}}>
            <div style={{...styles.statValue, color: '#ea580c'}}>95%</div>
            <div style={styles.statLabel}>Faollik</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
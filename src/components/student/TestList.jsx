import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TestList = () => {
  const [filter, setFilter] = useState('all');

  const tests = [
    { 
      id: 1, 
      title: 'Matematika Test 1', 
      subject: 'Matematika', 
      duration: 45, 
      questions: 20, 
      status: 'available',
      dueDate: '2023-12-15',
      attempts: 0,
      maxAttempts: 1
    },
    { 
      id: 2, 
      title: 'Fizika Test 1', 
      subject: 'Fizika', 
      duration: 60, 
      questions: 25, 
      status: 'completed',
      dueDate: '2023-12-10',
      attempts: 1,
      maxAttempts: 1,
      score: 85
    },
    { 
      id: 3, 
      title: 'Kimyo Test 1', 
      subject: 'Kimyo', 
      duration: 30, 
      questions: 15, 
      status: 'upcoming',
      dueDate: '2023-12-20',
      attempts: 0,
      maxAttempts: 2
    },
  ];

  const filteredTests = tests.filter(test => {
    if (filter === 'all') return true;
    return test.status === filter;
  });

  const getStatusBadge = (test) => {
    switch (test.status) {
      case 'available':
        return { backgroundColor: '#dcfce7', color: '#16a34a', text: 'Mavjud' };
      case 'completed':
        return { backgroundColor: '#dbeafe', color: '#2563eb', text: 'Yakunlangan' };
      case 'upcoming':
        return { backgroundColor: '#fef3c7', color: '#d97706', text: 'Kutilmoqda' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#6b7280', text: 'Nomaʼlum' };
    }
  };

  const getActionButton = (test) => {
    switch (test.status) {
      case 'available':
        return (
          <Link
            to={`/student/test/${test.id}`}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            Testni boshlash
          </Link>
        );
      case 'completed':
        return (
          <Link
            to={`/student/results/${test.id}`}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
          >
            Natijani ko'rish
          </Link>
        );
      case 'upcoming':
        return (
          <button
            disabled
            style={{
              backgroundColor: '#d1d5db',
              color: '#6b7280',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'not-allowed'
            }}
          >
            Hali boshlanmadi
          </button>
        );
      default:
        return null;
    }
  };

  const styles = {
    page: {
      padding: '24px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1f2937',
      margin: 0
    },
    filter: {
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      outline: 'none'
    },
    testList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    testCard: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'transform 0.2s'
    },
    testCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    testHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px'
    },
    testInfo: {
      flex: 1
    },
    testTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 8px 0'
    },
    testMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      color: '#6b7280',
      fontSize: '14px',
      flexWrap: 'wrap'
    },
    statusBadge: {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500'
    },
    testFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '16px'
    },
    testStats: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      color: '#6b7280',
      fontSize: '14px'
    },
    score: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    scoreValue: {
      fontSize: '18px',
      fontWeight: '600'
    },
    scoreGood: {
      color: '#16a34a'
    },
    scoreAverage: {
      color: '#2563eb'
    },
    emptyState: {
      textAlign: 'center',
      padding: '48px 24px'
    },
    emptyIcon: {
      fontSize: '48px',
      marginBottom: '16px'
    },
    emptyTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#6b7280',
      marginBottom: '8px'
    },
    emptyText: {
      color: '#9ca3af',
      fontSize: '16px'
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Testlar Ro'yxati</h1>
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.filter}
        >
          <option value="all">Barchasi</option>
          <option value="available">Mavjud testlar</option>
          <option value="completed">Yakunlangan</option>
          <option value="upcoming">Kutilayotgan</option>
        </select>
      </div>

      <div style={styles.testList}>
        {filteredTests.map((test) => {
          const statusStyle = getStatusBadge(test);
          return (
            <div 
              key={test.id} 
              style={styles.testCard}
              onMouseOver={(e) => {
                e.target.style.transform = styles.testCardHover.transform;
                e.target.style.boxShadow = styles.testCardHover.boxShadow;
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'none';
                e.target.style.boxShadow = styles.testCard.boxShadow;
              }}
            >
              <div style={styles.testHeader}>
                <div style={styles.testInfo}>
                  <h3 style={styles.testTitle}>{test.title}</h3>
                  <div style={styles.testMeta}>
                    <span>📚 {test.subject}</span>
                    <span>⏱ {test.duration} daqiqa</span>
                    <span>❓ {test.questions} savol</span>
                    <span>📅 Muddati: {test.dueDate}</span>
                  </div>
                </div>
                <span style={{...styles.statusBadge, ...statusStyle}}>
                  {statusStyle.text}
                </span>
              </div>

              <div style={styles.testFooter}>
                <div style={styles.testStats}>
                  {test.status === 'completed' && (
                    <div style={styles.score}>
                      <span style={{color: '#6b7280'}}>Ball:</span>
                      <span style={{
                        ...styles.scoreValue,
                        ...(test.score >= 90 ? styles.scoreGood : styles.scoreAverage)
                      }}>
                        {test.score}
                      </span>
                    </div>
                  )}
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <span>Urinishlar:</span>
                    <span>{test.attempts} / {test.maxAttempts}</span>
                  </div>
                </div>
                
                {getActionButton(test)}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTests.length === 0 && (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📝</div>
          <h3 style={styles.emptyTitle}>Testlar topilmadi</h3>
          <p style={styles.emptyText}>
            {filter === 'available' && "Hozirda mavjud testlar yo'q"}
            {filter === 'completed' && "Siz hali hech qanday testni yakunlamagansiz"}
            {filter === 'upcoming' && "Kutilayotgan testlar yo'q"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TestList;
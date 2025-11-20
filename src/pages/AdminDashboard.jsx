import React from 'react';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
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
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    statCard: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    },
    statValue: {
      fontSize: '32px',
      fontWeight: '700',
      marginBottom: '8px'
    },
    statLabel: {
      color: '#6b7280',
      fontSize: '14px',
      fontWeight: '500'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '24px'
    },
    card: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '16px',
      color: '#1f2937'
    },
    activityItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      marginBottom: '8px'
    },
    activityMain: {
      fontWeight: '500'
    },
    activitySub: {
      color: '#6b7280',
      fontSize: '12px'
    },
    statusBadge: {
      backgroundColor: '#10b981',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500'
    },
    scoreBadge: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500'
    }
  };

  const stats = [
    { label: 'Jami Oʻquvchilar', value: '150', color: '#3b82f6' },
    { label: 'Aktiv Testlar', value: '12', color: '#10b981' },
    { label: 'Bugun Test Berganlar', value: '45', color: '#8b5cf6' },
    { label: 'Oʻrtacha Ball', value: '78.5', color: '#f59e0b' },
  ];

  const recentTests = [
    { title: 'Matematika Test 1', date: '12.12.2023', status: 'Aktiv' },
    { title: 'Fizika Test 1', date: '11.12.2023', status: 'Aktiv' },
    { title: 'Kimyo Test 1', date: '10.12.2023', status: 'Yakunlangan' },
  ];

  const recentResults = [
    { student: 'Ali Valiyev', test: 'Matematika Test 1', score: '85 ball' },
    { student: 'Dilshod Hakimov', test: 'Fizika Test 1', score: '92 ball' },
    { student: 'Olim Olimov', test: 'Kimyo Test 1', score: '78 ball' },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Xush kelibsiz, {user?.name}!</h1>
        <p style={styles.subtitle}>Admin paneliga xush kelibsiz</p>
      </div>

      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={{...styles.statValue, color: stat.color}}>
              {stat.value}
            </div>
            <div style={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>So'nggi Testlar</h3>
          <div>
            {recentTests.map((test, index) => (
              <div key={index} style={styles.activityItem}>
                <div>
                  <div style={styles.activityMain}>{test.title}</div>
                  <div style={styles.activitySub}>{test.date}</div>
                </div>
                <span style={styles.statusBadge}>{test.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>So'nggi Natijalar</h3>
          <div>
            {recentResults.map((result, index) => (
              <div key={index} style={styles.activityItem}>
                <div>
                  <div style={styles.activityMain}>{result.student}</div>
                  <div style={styles.activitySub}>{result.test}</div>
                </div>
                <span style={styles.scoreBadge}>{result.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
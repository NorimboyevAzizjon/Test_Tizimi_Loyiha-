import React, { useState } from 'react';

const ResultsViewer = () => {
  const [selectedTest, setSelectedTest] = useState('all');
  const [selectedGroup, setSelectedGroup] = useState('all');

  const tests = [
    { id: 1, title: 'Matematika Test 1' },
    { id: 2, title: 'Fizika Test 1' },
  ];

  const groups = ['Guruh 1', 'Guruh 2', 'Guruh 3'];

  const results = [
    { id: 1, student: 'Ali Valiyev', test: 'Matematika Test 1', group: 'Guruh 1', score: 85, total: 100, date: '2023-12-10' },
    { id: 2, student: 'Dilshod Hakimov', test: 'Matematika Test 1', group: 'Guruh 2', score: 92, total: 100, date: '2023-12-10' },
    { id: 3, student: 'Olim Olimov', test: 'Fizika Test 1', group: 'Guruh 1', score: 78, total: 100, date: '2023-12-09' },
  ];

  const filteredResults = results.filter(result => {
    return (selectedTest === 'all' || result.test === selectedTest) &&
           (selectedGroup === 'all' || result.group === selectedGroup);
  });

  const getGradeColor = (score) => {
    if (score >= 90) return { backgroundColor: '#dcfce7', color: '#16a34a' };
    if (score >= 70) return { backgroundColor: '#dbeafe', color: '#2563eb' };
    return { backgroundColor: '#fef2f2', color: '#dc2626' };
  };

  const styles = {
    page: {
      padding: '24px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '24px'
    },
    filters: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '24px'
    },
    filtersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px'
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    filterLabel: {
      color: '#374151',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '6px'
    },
    select: {
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      outline: 'none'
    },
    exportButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      width: '100%'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    },
    statCard: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
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
    table: {
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    tableHeader: {
      backgroundColor: '#f9fafb',
      borderBottom: '1px solid #e5e7eb'
    },
    tableHeaderCell: {
      padding: '16px',
      textAlign: 'left',
      fontSize: '12px',
      fontWeight: '600',
      color: '#6b7280',
      textTransform: 'uppercase'
    },
    tableRow: {
      borderBottom: '1px solid #e5e7eb',
      transition: 'background-color 0.2s'
    },
    tableRowHover: {
      backgroundColor: '#f9fafb'
    },
    tableCell: {
      padding: '16px',
      fontSize: '14px',
      color: '#374151'
    },
    scoreBadge: {
      padding: '4px 8px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600'
    },
    gradeText: {
      fontWeight: '500'
    },
    gradeExcellent: {
      color: '#16a34a'
    },
    gradeGood: {
      color: '#2563eb'
    },
    gradeAverage: {
      color: '#d97706'
    },
    gradePoor: {
      color: '#dc2626'
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Test Natijalari</h1>

      <div style={styles.filters}>
        <div style={styles.filtersGrid}>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Testni tanlang</label>
            <select
              value={selectedTest}
              onChange={(e) => setSelectedTest(e.target.value)}
              style={styles.select}
            >
              <option value="all">Barcha testlar</option>
              {tests.map(test => (
                <option key={test.id} value={test.title}>{test.title}</option>
              ))}
            </select>
          </div>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Guruhni tanlang</label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              style={styles.select}
            >
              <option value="all">Barcha guruhlar</option>
              {groups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Eksport</label>
            <button style={styles.exportButton}>
              Excel ga yuklab olish
            </button>
          </div>
        </div>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{...styles.statValue, color: '#2563eb'}}>{filteredResults.length}</div>
          <div style={styles.statLabel}>Jami topshirganlar</div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statValue, color: '#16a34a'}}>
            {filteredResults.length ? Math.round(filteredResults.reduce((a, b) => a + b.score, 0) / filteredResults.length) : 0}
          </div>
          <div style={styles.statLabel}>O'rtacha ball</div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statValue, color: '#9333ea'}}>
            {filteredResults.filter(r => r.score >= 90).length}
          </div>
          <div style={styles.statLabel}>A'lo baholar</div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statValue, color: '#dc2626'}}>
            {filteredResults.filter(r => r.score < 50).length}
          </div>
          <div style={styles.statLabel}>Yiqilganlar</div>
        </div>
      </div>

      <div style={styles.table}>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>O'quvchi</th>
              <th style={styles.tableHeaderCell}>Test</th>
              <th style={styles.tableHeaderCell}>Guruh</th>
              <th style={styles.tableHeaderCell}>Ball</th>
              <th style={styles.tableHeaderCell}>Sana</th>
              <th style={styles.tableHeaderCell}>Baholash</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((result) => {
              const gradeStyle = getGradeColor(result.score);
              return (
                <tr 
                  key={result.id} 
                  style={styles.tableRow}
                  onMouseOver={(e) => e.target.style.backgroundColor = styles.tableRowHover.backgroundColor}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <td style={styles.tableCell}>{result.student}</td>
                  <td style={styles.tableCell}>{result.test}</td>
                  <td style={styles.tableCell}>{result.group}</td>
                  <td style={styles.tableCell}>
                    <span style={{...styles.scoreBadge, ...gradeStyle}}>
                      {result.score} / {result.total}
                    </span>
                  </td>
                  <td style={styles.tableCell}>{result.date}</td>
                  <td style={styles.tableCell}>
                    <span style={{
                      ...styles.gradeText,
                      ...(result.score >= 90 ? styles.gradeExcellent :
                          result.score >= 70 ? styles.gradeGood :
                          result.score >= 50 ? styles.gradeAverage : styles.gradePoor)
                    }}>
                      {result.score >= 90 ? 'Aʼlo' :
                       result.score >= 70 ? 'Yaxshi' :
                       result.score >= 50 ? 'Qoniqarli' : 'Qoniqarsiz'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsViewer;
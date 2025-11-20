import React, { useState } from 'react';

const TestCreator = () => {
  const [tests, setTests] = useState([
    { id: 1, title: 'Matematika Test 1', subject: 'Matematika', duration: 45, questions: 20, status: 'active' },
    { id: 2, title: 'Fizika Test 1', subject: 'Fizika', duration: 60, questions: 25, status: 'draft' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newTest, setNewTest] = useState({
    title: '',
    subject: '',
    duration: 45,
    questions: 10,
    status: 'draft'
  });

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
    addButton: {
      backgroundColor: '#10b981',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    addButtonHover: {
      backgroundColor: '#059669'
    },
    testsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '32px'
    },
    testCard: {
      backgroundColor: 'white',
      padding: '20px',
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
    testTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    statusBadge: {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500'
    },
    statusActive: {
      backgroundColor: '#dcfce7',
      color: '#16a34a'
    },
    statusDraft: {
      backgroundColor: '#fef3c7',
      color: '#d97706'
    },
    testInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '16px'
    },
    testInfoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#6b7280',
      fontSize: '14px'
    },
    testActions: {
      display: 'flex',
      gap: '8px'
    },
    actionButton: {
      padding: '6px 12px',
      borderRadius: '4px',
      border: 'none',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      flex: 1
    },
    editButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white'
    }
  };

  const handleCreateTest = (e) => {
    e.preventDefault();
    const test = {
      id: tests.length + 1,
      ...newTest
    };
    setTests([...tests, test]);
    setNewTest({ title: '', subject: '', duration: 45, questions: 10, status: 'draft' });
    setShowForm(false);
  };

  const handleDeleteTest = (id) => {
    setTests(tests.filter(test => test.id !== id));
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Test Yaratish</h1>
        <button
          onClick={() => setShowForm(true)}
          style={styles.addButton}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.addButtonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.addButton.backgroundColor}
        >
          + Yangi Test
        </button>
      </div>

      <div style={styles.testsGrid}>
        {tests.map((test) => (
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
              <h3 style={styles.testTitle}>{test.title}</h3>
              <span style={{
                ...styles.statusBadge,
                ...(test.status === 'active' ? styles.statusActive : styles.statusDraft)
              }}>
                {test.status}
              </span>
            </div>
            <div style={styles.testInfo}>
              <div style={styles.testInfoItem}>
                <span>📚 {test.subject}</span>
              </div>
              <div style={styles.testInfoItem}>
                <span>⏱ {test.duration} daqiqa</span>
              </div>
              <div style={styles.testInfoItem}>
                <span>❓ {test.questions} savol</span>
              </div>
            </div>
            <div style={styles.testActions}>
              <button style={{...styles.actionButton, ...styles.editButton}}>
                Tahrirlash
              </button>
              <button 
                style={{...styles.actionButton, ...styles.deleteButton}}
                onClick={() => handleDeleteTest(test.id)}
              >
                O'chirish
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h2 style={{fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#1f2937'}}>
              Yangi Test Yaratish
            </h2>
            <form onSubmit={handleCreateTest} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <label style={{color: '#374151', fontSize: '14px', fontWeight: '500', marginBottom: '6px'}}>
                    Test nomi
                  </label>
                  <input
                    type="text"
                    value={newTest.title}
                    onChange={(e) => setNewTest({...newTest, title: e.target.value})}
                    style={{
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    required
                  />
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <label style={{color: '#374151', fontSize: '14px', fontWeight: '500', marginBottom: '6px'}}>
                    Fan
                  </label>
                  <select
                    value={newTest.subject}
                    onChange={(e) => setNewTest({...newTest, subject: e.target.value})}
                    style={{
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    required
                  >
                    <option value="">Tanlang</option>
                    <option value="Matematika">Matematika</option>
                    <option value="Fizika">Fizika</option>
                    <option value="Kimyo">Kimyo</option>
                    <option value="Biologiya">Biologiya</option>
                  </select>
                </div>
              </div>
              
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <label style={{color: '#374151', fontSize: '14px', fontWeight: '500', marginBottom: '6px'}}>
                    Vaqt (daqiqa)
                  </label>
                  <input
                    type="number"
                    value={newTest.duration}
                    onChange={(e) => setNewTest({...newTest, duration: parseInt(e.target.value)})}
                    style={{
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    required
                  />
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <label style={{color: '#374151', fontSize: '14px', fontWeight: '500', marginBottom: '6px'}}>
                    Holati
                  </label>
                  <select
                    value={newTest.status}
                    onChange={(e) => setNewTest({...newTest, status: e.target.value})}
                    style={{
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="draft">Qoralama</option>
                    <option value="active">Aktiv</option>
                  </select>
                </div>
              </div>
              
              <div style={{display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px'}}>
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    backgroundColor: '#6b7280',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Bekor qilish
                </button>
                <button type="submit" style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Yaratish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCreator;
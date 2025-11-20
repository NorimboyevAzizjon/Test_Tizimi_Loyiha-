import React, { useState } from 'react';

const GroupManager = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Guruh 1', students: 25, tests: 12 },
    { id: 2, name: 'Guruh 2', students: 30, tests: 10 },
    { id: 3, name: 'Guruh 3', students: 22, tests: 8 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '' });

  const handleAddGroup = (e) => {
    e.preventDefault();
    const group = {
      id: groups.length + 1,
      name: newGroup.name,
      students: 0,
      tests: 0
    };
    setGroups([...groups, group]);
    setNewGroup({ name: '' });
    setShowForm(false);
  };

  const handleDeleteGroup = (id) => {
    setGroups(groups.filter(group => group.id !== id));
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
    groupsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '32px'
    },
    groupCard: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'transform 0.2s'
    },
    groupCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    groupHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px'
    },
    groupName: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    deleteButton: {
      color: '#ef4444',
      background: 'none',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      padding: '4px'
    },
    groupInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '16px'
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    infoLabel: {
      color: '#6b7280',
      fontSize: '14px'
    },
    infoValue: {
      fontWeight: '600',
      color: '#1f2937'
    },
    groupActions: {
      display: 'flex',
      gap: '8px'
    },
    actionButton: {
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      flex: 1
    },
    viewButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    assignButton: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    statsCard: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    statsTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '20px',
      color: '#1f2937'
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
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Guruhlarni Boshqarish</h1>
        <button
          onClick={() => setShowForm(true)}
          style={styles.addButton}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.addButtonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.addButton.backgroundColor}
        >
          + Yangi Guruh
        </button>
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
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            width: '400px',
            maxWidth: '90vw'
          }}>
            <h2 style={{fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#1f2937'}}>
              Yangi Guruh
            </h2>
            <form onSubmit={handleAddGroup} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label style={{color: '#374151', fontSize: '14px', fontWeight: '500', marginBottom: '6px'}}>
                  Guruh nomi
                </label>
                <input
                  type="text"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                  style={{
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="Masalan: Guruh 1"
                  required
                />
              </div>
              <div style={{display: 'flex', gap: '12px'}}>
                <button type="submit" style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  flex: 1
                }}>
                  Yaratish
                </button>
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
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={styles.groupsGrid}>
        {groups.map((group) => (
          <div 
            key={group.id} 
            style={styles.groupCard}
            onMouseOver={(e) => {
              e.target.style.transform = styles.groupCardHover.transform;
              e.target.style.boxShadow = styles.groupCardHover.boxShadow;
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'none';
              e.target.style.boxShadow = styles.groupCard.boxShadow;
            }}
          >
            <div style={styles.groupHeader}>
              <h3 style={styles.groupName}>{group.name}</h3>
              <button
                onClick={() => handleDeleteGroup(group.id)}
                style={styles.deleteButton}
              >
                🗑️
              </button>
            </div>
            
            <div style={styles.groupInfo}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>O'quvchilar soni:</span>
                <span style={styles.infoValue}>{group.students}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Testlar soni:</span>
                <span style={styles.infoValue}>{group.tests}</span>
              </div>
            </div>

            <div style={styles.groupActions}>
              <button style={{...styles.actionButton, ...styles.viewButton}}>
                O'quvchilarni ko'rish
              </button>
              <button style={{...styles.actionButton, ...styles.assignButton}}>
                Test tayinlash
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.statsCard}>
        <h3 style={styles.statsTitle}>Guruhlar Statistikasi</h3>
        <div style={styles.statsGrid}>
          <div style={{...styles.statItem, backgroundColor: '#dbeafe'}}>
            <div style={{...styles.statValue, color: '#2563eb'}}>{groups.length}</div>
            <div style={styles.statLabel}>Jami guruhlar</div>
          </div>
          <div style={{...styles.statItem, backgroundColor: '#dcfce7'}}>
            <div style={{...styles.statValue, color: '#16a34a'}}>
              {groups.reduce((sum, group) => sum + group.students, 0)}
            </div>
            <div style={styles.statLabel}>Jami o'quvchilar</div>
          </div>
          <div style={{...styles.statItem, backgroundColor: '#f3e8ff'}}>
            <div style={{...styles.statValue, color: '#9333ea'}}>
              {groups.reduce((sum, group) => sum + group.tests, 0)}
            </div>
            <div style={styles.statLabel}>Jami testlar</div>
          </div>
          <div style={{...styles.statItem, backgroundColor: '#ffedd5'}}>
            <div style={{...styles.statValue, color: '#ea580c'}}>
              {Math.round(groups.reduce((sum, group) => sum + group.students, 0) / groups.length)}
            </div>
            <div style={styles.statLabel}>O'rtacha o'quvchi</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupManager;
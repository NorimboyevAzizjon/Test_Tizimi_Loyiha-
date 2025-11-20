import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Ali Valiyev', username: 'ali123', group: 'Guruh 1', role: 'student' },
    { id: 2, name: 'Dilshod Hakimov', username: 'dilshod', group: 'Guruh 2', role: 'student' },
    { id: 3, name: 'Olim Olimov', username: 'olim', group: 'Guruh 1', role: 'student' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    password: '',
    group: '',
    role: 'student'
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    const user = {
      id: users.length + 1,
      ...newUser
    };
    setUsers([...users, user]);
    setNewUser({ name: '', username: '', password: '', group: '', role: 'student' });
    setShowAddForm(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
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
    modalOverlay: {
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
    },
    modal: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      width: '400px',
      maxWidth: '90vw'
    },
    modalTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '20px',
      color: '#1f2937'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      color: '#374151',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '6px'
    },
    input: {
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    inputFocus: {
      borderColor: '#3b82f6'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      marginTop: '8px'
    },
    submitButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      flex: 1
    },
    cancelButton: {
      backgroundColor: '#6b7280',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      flex: 1
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
    roleBadge: {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500'
    },
    roleAdmin: {
      backgroundColor: '#fef2f2',
      color: '#dc2626'
    },
    roleStudent: {
      backgroundColor: '#eff6ff',
      color: '#2563eb'
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '4px',
      border: 'none',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    deleteButtonHover: {
      backgroundColor: '#dc2626'
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Foydalanuvchilarni Boshqarish</h1>
        <button
          onClick={() => setShowAddForm(true)}
          style={styles.addButton}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.addButtonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.addButton.backgroundColor}
        >
          + Yangi Foydalanuvchi
        </button>
      </div>

      {showAddForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>Yangi Foydalanuvchi</h2>
            <form onSubmit={handleAddUser} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>To'liq ism</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
                  onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Username</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
                  onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Parol</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
                  onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Guruh</label>
                <input
                  type="text"
                  value={newUser.group}
                  onChange={(e) => setNewUser({...newUser, group: e.target.value})}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
                  onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Rol</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  style={styles.input}
                >
                  <option value="student">O'quvchi</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.submitButton}>
                  Qo'shish
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowAddForm(false)}
                  style={styles.cancelButton}
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={styles.table}>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>ID</th>
              <th style={styles.tableHeaderCell}>Ism</th>
              <th style={styles.tableHeaderCell}>Username</th>
              <th style={styles.tableHeaderCell}>Guruh</th>
              <th style={styles.tableHeaderCell}>Rol</th>
              <th style={styles.tableHeaderCell}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr 
                key={user.id} 
                style={styles.tableRow}
                onMouseOver={(e) => e.target.style.backgroundColor = styles.tableRowHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <td style={styles.tableCell}>{user.id}</td>
                <td style={styles.tableCell}>{user.name}</td>
                <td style={styles.tableCell}>{user.username}</td>
                <td style={styles.tableCell}>{user.group}</td>
                <td style={styles.tableCell}>
                  <span style={{
                    ...styles.roleBadge,
                    ...(user.role === 'admin' ? styles.roleAdmin : styles.roleStudent)
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={styles.tableCell}>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    style={styles.deleteButton}
                    onMouseOver={(e) => e.target.style.backgroundColor = styles.deleteButtonHover.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = styles.deleteButton.backgroundColor}
                  >
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
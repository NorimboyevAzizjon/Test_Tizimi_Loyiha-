import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const Header = () => {
  const { user, role } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const styles = {
    header: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000,
      height: '64px'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%'
    },
    leftSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    title: {
      fontSize: '20px',
      fontWeight: '700',
      margin: 0
    },
    roleBadge: {
      backgroundColor: '#3b82f6',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500'
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    userName: {
      color: '#dbeafe',
      fontSize: '14px'
    },
    logoutButton: {
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    logoutButtonHover: {
      backgroundColor: '#dc2626'
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.leftSection}>
          <h1 style={styles.title}>Test Tizimi</h1>
          <span style={styles.roleBadge}>
            {role === 'admin' ? 'Administrator' : 'Oʻquvchi'}
          </span>
        </div>
        
        <div style={styles.rightSection}>
          <span style={styles.userName}>
            {user?.name || user?.username}
          </span>
          <button
            onClick={handleLogout}
            style={styles.logoutButton}
            onMouseOver={(e) => e.target.style.backgroundColor = styles.logoutButtonHover.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = styles.logoutButton.backgroundColor}
          >
            Chiqish
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
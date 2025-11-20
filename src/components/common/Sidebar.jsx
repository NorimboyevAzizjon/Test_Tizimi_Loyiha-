import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { role } = useSelector(state => state.auth);
  const location = useLocation();

  const adminMenu = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'Foydalanuvchilar', icon: '👥' },
    { path: '/admin/tests', label: 'Testlar', icon: '📝' },
    { path: '/admin/groups', label: 'Guruhlar', icon: '🏫' },
    { path: '/admin/results', label: 'Natijalar', icon: '📈' },
  ];

  const studentMenu = [
    { path: '/student', label: 'Dashboard', icon: '📊' },
    { path: '/student/tests', label: 'Testlar', icon: '📝' },
    { path: '/student/results', label: 'Natijalar', icon: '📈' },
  ];

  const menu = role === 'admin' ? adminMenu : studentMenu;

  const styles = {
    sidebar: {
      width: '256px',
      backgroundColor: '#1f2937',
      color: 'white',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: '64px',
      overflowY: 'auto'
    },
    nav: {
      padding: '16px'
    },
    menuList: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    menuItem: {
      margin: 0
    },
    menuLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      borderRadius: '8px',
      textDecoration: 'none',
      color: '#d1d5db',
      transition: 'all 0.2s',
      fontSize: '14px'
    },
    menuLinkActive: {
      backgroundColor: '#2563eb',
      color: 'white'
    },
    menuLinkHover: {
      backgroundColor: '#374151',
      color: 'white'
    },
    icon: {
      fontSize: '18px',
      width: '24px',
      textAlign: 'center'
    }
  };

  return (
    <aside style={styles.sidebar}>
      <nav style={styles.nav}>
        <ul style={styles.menuList}>
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} style={styles.menuItem}>
                <Link
                  to={item.path}
                  style={{
                    ...styles.menuLink,
                    ...(isActive ? styles.menuLinkActive : {})
                  }}
                  onMouseOver={(e) => !isActive && (e.target.style.backgroundColor = styles.menuLinkHover.backgroundColor)}
                  onMouseOut={(e) => !isActive && (e.target.style.backgroundColor = 'transparent')}
                >
                  <span style={styles.icon}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
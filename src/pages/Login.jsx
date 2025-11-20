import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'student'
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      setTimeout(() => {
        const mockUser = {
          id: 1,
          username: formData.username,
          name: formData.username === 'admin' ? 'Administrator' : 'Oʻquvchi',
          group: formData.role === 'student' ? 'Guruh 1' : null
        };

        dispatch(loginSuccess({
          user: mockUser,
          role: formData.role
        }));
      }, 1000);
    } catch (err) {
      dispatch(loginFailure('Login xatosi'));
    }
  };

  // Inline CSS styles
  const styles = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Inter, Arial, sans-serif'
    },
    container: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '450px',
      border: '1px solid #e1e5e9'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '8px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    subtitle: {
      color: '#718096',
      fontSize: '16px',
      margin: 0
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    error: {
      backgroundColor: '#fed7d7',
      border: '1px solid #feb2b2',
      color: '#c53030',
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      color: '#4a5568',
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '8px',
      display: 'block'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.3s ease',
      backgroundColor: '#f7fafc'
    },
    inputFocus: {
      borderColor: '#667eea',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '16px',
      outline: 'none',
      backgroundColor: '#f7fafc',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    button: {
      width: '100%',
      backgroundColor: '#667eea',
      color: 'white',
      fontWeight: '600',
      padding: '14px 20px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '10px'
    },
    buttonHover: {
      backgroundColor: '#5a6fd8',
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)'
    },
    buttonDisabled: {
      backgroundColor: '#a0aec0',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none'
    },
    demoInfo: {
      textAlign: 'center',
      marginTop: '25px',
      padding: '15px',
      backgroundColor: '#edf2f7',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#4a5568'
    },
    demoText: {
      margin: '5px 0',
      fontWeight: '500'
    },
    demoHighlight: {
      color: '#667eea',
      fontWeight: '600'
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Test Tizimi</h1>
          <p style={styles.subtitle}>Tizimga kirish</p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          style={styles.form}
        >
          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Foydalanuvchi nomi
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.backgroundColor = styles.inputFocus.backgroundColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = styles.input.borderColor;
                e.target.style.backgroundColor = styles.input.backgroundColor;
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Foydalanuvchi nomingizni kiriting"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Parol
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.backgroundColor = styles.inputFocus.backgroundColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = styles.input.borderColor;
                e.target.style.backgroundColor = styles.input.backgroundColor;
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Parolingizni kiriting"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Rol
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={styles.select}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.backgroundColor = styles.inputFocus.backgroundColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = styles.select.borderColor;
                e.target.style.backgroundColor = styles.select.backgroundColor;
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="student">Oʻquvchi</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
                e.target.style.transform = styles.buttonHover.transform;
                e.target.style.boxShadow = styles.buttonHover.boxShadow;
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = styles.button.backgroundColor;
                e.target.style.transform = 'none';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            {loading ? (
              <span>Kirilmoqda...</span>
            ) : (
              <span>Kirish</span>
            )}
          </button>
        </form>

        <div style={styles.demoInfo}>
          <p style={styles.demoText}>
            Demo login: 
            <span style={styles.demoHighlight}> admin </span>
            / 
            <span style={styles.demoHighlight}> 123</span>
          </p>
          <p style={styles.demoText}>
            Yoki istalgan foydalanuvchi nomi va parol
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
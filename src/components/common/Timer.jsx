import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft < 60) return { color: '#dc2626', backgroundColor: '#fef2f2' };
    if (timeLeft < 300) return { color: '#d97706', backgroundColor: '#fef3c7' };
    return { color: '#16a34a', backgroundColor: '#f0fdf4' };
  };

  const timerStyle = getTimerColor();

  const styles = {
    timer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 12px',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '16px'
    },
    icon: {
      fontSize: '18px'
    }
  };

  return (
    <div style={{...styles.timer, backgroundColor: timerStyle.backgroundColor}}>
      <span style={styles.icon}>⏰</span>
      <span style={{color: timerStyle.color}}>
        {formatTime(timeLeft)}
      </span>
      <span style={{color: '#6b7280', fontSize: '14px'}}>qoldi</span>
    </div>
  );
};

export default Timer;
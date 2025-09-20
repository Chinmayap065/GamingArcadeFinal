import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import LoginPage from './LoginPage';
import PageHeader from './components/PageHeader';
import './App.css'; 

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  if (!token) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-container">
      <PageHeader onLogout={handleLogout} />
      <Container as="main" className="main-content my-4">
        <Outlet />
      </Container>
      <footer className="text-center text-muted mt-auto py-3">
         <small>© 2025 Gaming Club. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default App;
import { useState } from 'react';
import '../components/styles/LoginForm.css';
import './styles/LoginPage.css';
import '../components/styles/CommonBackground.css';
import logo from '../assets/images/S__76038209-1024x723.png';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple mock login - in a real app, you would validate against a database
    if (username && password) {
      onLogin(username);
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="login-page">
      <div className="animated-background">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>
      
      <div className="login-container">
        <div className="login-logo">
          <img src={logo} alt="SkinX Logo" />
        </div>
        
        <div className="login-form">
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-logo">Donation Campaign</div>
          <ul className="nav-links">
            <li>
              <Link to="/">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Donation Campaign. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

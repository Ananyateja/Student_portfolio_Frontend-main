import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const result = login(form.email, form.password);
      if (result.success) navigate(result.role === 'admin' ? '/admin' : '/student');
      else setError(result.error);
      setLoading(false);
    }, 600);
  };

  const fillDemo = (type) => {
    if (type === 'admin') setForm({ email: 'admin@edu.com', password: 'admin123' });
    else setForm({ email: 'alice@student.com', password: 'pass123' });
  };

  return (
    <div className="auth-page page-enter">
      <div className="auth-bg">
        <div className="auth-orb orb1" /><div className="auth-orb orb2" />
      </div>
      <div className="auth-card glass">
        <div className="auth-logo">
          <div className="brand-icon" style={{ width: 48, height: 48, fontSize: 18 }}>SP</div>
        </div>
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-sub">Sign in to your StudPortfolio account</p>

        <div className="demo-btns">
          <button className="demo-btn" onClick={() => fillDemo('admin')}>Fill Admin Demo</button>
          <button className="demo-btn" onClick={() => fillDemo('student')}>Fill Student Demo</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrap">
              <FiMail className="input-icon" />
              <input className="input-field input-with-icon" type="email" placeholder="you@example.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="input-wrap">
              <FiLock className="input-icon" />
              <input className="input-field input-with-icon" type={showPass ? 'text' : 'password'} placeholder="••••••••"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
              <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? <span className="spinner" /> : <><FiLogIn /> Sign In</>}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}

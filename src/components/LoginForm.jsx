/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';
import { useState } from 'react';

const USERS = [
  { username: 'dev', password: '123', role: 'developer' },
  { username: 'mgr', password: '123', role: 'manager' },
];

export default function LoginForm() {
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = USERS.find(
      (u) => u.username === form.username && u.password === form.password
    );
    if (found) {
      dispatch(login(found));
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit">Login</button>
        <p className="forgot">Forgot password?</p>
      </form>

      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to right, #a18cd1, #fbc2eb);
        }

        .login-form {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
        }

        .login-form h2 {
          margin-bottom: 20px;
          text-align: center;
          color: #5b21b6;
        }

        .login-form label {
          margin-bottom: 5px;
          font-weight: bold;
        }

        .login-form input {
          padding: 10px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }

        .login-form button {
          padding: 10px;
          background-color: #6b21a8;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .login-form button:hover {
          background-color: #5b21b6;
        }

        .forgot {
          margin-top: 10px;
          font-size: 0.9rem;
          text-align: right;
          color: #4f46e5;
          cursor: pointer;
        }

        .forgot:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

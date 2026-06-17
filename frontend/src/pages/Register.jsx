import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(name, email, password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed. Try a different email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container animate-fadeIn">
      <div className="auth-card glass-card">
        <div className="auth-header">
          <div className="auth-icon-wrapper">
            <UserPlus size={24} className="text-accent" />
          </div>
          <h2>Create Account</h2>
          <p>Join Go-Epic to learn Go programming step-by-step</p>
        </div>

        {error && (
          <div className="auth-error animate-shake">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="auth-success animate-fadeIn">
            <span>Registration successful! Redirecting to login...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                id="name"
                type="text"
                className="input input-with-icon"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                className="input input-with-icon"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="input input-with-icon"
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading || success}
          >
            {loading ? <span className="spinner spinner-sm"></span> : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login" className="text-accent hover-underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, LogOut } from 'lucide-react';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="profile-container animate-fadeIn">
      <div className="page-header">
        <h1>User Profile</h1>
        <p>Manage your account settings and credentials</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card glass-card">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <h3>{user?.name || 'User'}</h3>
            <span className="profile-role-badge">
              <Shield size={12} />
              {user?.role || 'User'}
            </span>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <User className="detail-icon" size={18} />
              <div className="detail-info">
                <span className="detail-label">Full Name</span>
                <span className="detail-value">{user?.name || 'N/A'}</span>
              </div>
            </div>

            <div className="detail-item">
              <Mail className="detail-icon" size={18} />
              <div className="detail-info">
                <span className="detail-label">Email Address</span>
                <span className="detail-value">{user?.email || 'N/A'}</span>
              </div>
            </div>
          </div>

          <button onClick={logout} className="btn btn-secondary profile-logout-btn">
            <LogOut size={16} />
            Logout from Session
          </button>
        </div>
      </div>
    </div>
  );
}

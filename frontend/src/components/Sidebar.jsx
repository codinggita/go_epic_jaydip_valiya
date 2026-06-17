import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Code2,
  Hash,
  LogIn,
  UserPlus,
  User,
  LogOut,
  Zap,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/problems', label: 'Problems', icon: Code2 },
  { path: '/topics', label: 'Topics', icon: Hash },
];

export default function Sidebar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="sidebar-mobile-toggle btn btn-icon"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon">
            <Zap size={24} />
          </div>
          {!collapsed && (
            <div className="logo-text">
              <span className="logo-go">Go</span>
              <span className="logo-epic">-Epic</span>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">{!collapsed && 'MENU'}</div>
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => setMobileOpen(false)}
              title={collapsed ? label : undefined}
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Auth section */}
        <div className="sidebar-footer">
          <div className="nav-section-label">{!collapsed && 'ACCOUNT'}</div>
          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'active' : ''}`
                }
                onClick={() => setMobileOpen(false)}
                title={collapsed ? 'Profile' : undefined}
              >
                <User size={20} />
                {!collapsed && <span>{user?.name || 'Profile'}</span>}
              </NavLink>
              <button
                className="nav-item nav-btn"
                onClick={handleLogout}
                title={collapsed ? 'Logout' : undefined}
              >
                <LogOut size={20} />
                {!collapsed && <span>Logout</span>}
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'active' : ''}`
                }
                onClick={() => setMobileOpen(false)}
                title={collapsed ? 'Login' : undefined}
              >
                <LogIn size={20} />
                {!collapsed && <span>Login</span>}
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'active' : ''}`
                }
                onClick={() => setMobileOpen(false)}
                title={collapsed ? 'Register' : undefined}
              >
                <UserPlus size={20} />
                {!collapsed && <span>Register</span>}
              </NavLink>
            </>
          )}
        </div>

        {/* Collapse toggle (desktop only) */}
        <button
          className="sidebar-collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>
    </>
  );
}

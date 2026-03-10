import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Truck, Map as MapIcon, BarChart3, Settings, LogOut, X } from 'lucide-react';
import useStore from '../store/useStore';

const Sidebar = ({ role, isOpen, closeSidebar }) => {
  const setUser = useStore(state => state.setUser);
  const user = useStore(state => state.user);
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['admin', 'user'] },
    { label: 'Trucks', icon: Truck, path: '/trucks', roles: ['admin'] },
    { label: 'Live Tracking', icon: MapIcon, path: '/tracking', roles: ['admin', 'user'] },
    { label: 'Analytics', icon: BarChart3, path: '/analytics', roles: ['admin', 'user'] },
  ];

  const handleRoleToggle = () => {
    setUser({ ...user, role: role === 'admin' ? 'user' : 'admin', name: role === 'admin' ? 'Standard User' : 'Admin User' });
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`} style={{
      width: '260px',
      backgroundColor: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 1rem',
      transition: 'transform var(--transition-normal), width var(--transition-normal)',
      zIndex: 50
    }}>
      <div className="flex items-center justify-between mb-8 px-4">
        <div className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, rgba(59, 130, 246, 0.4) 100%)',
            borderRadius: 'var(--radius-md)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <Truck size={20} color="white" />
          </div>
          <h1 className="text-xl font-bold text-gradient">FleetSync</h1>
        </div>
        
        <button className="btn-icon mobile-close-btn" onClick={closeSidebar}>
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {navItems.filter(item => item.roles.includes(role)).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={closeSidebar}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              color: isActive ? 'white' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              textDecoration: 'none',
              fontWeight: isActive ? 600 : 500,
              transition: 'all var(--transition-fast)',
              border: isActive ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent',
              boxShadow: isActive ? '0 0 10px rgba(59, 130, 246, 0.1)' : 'none'
            })}
          >
            <item.icon size={20} color={location.pathname === item.path ? 'var(--accent-primary)' : 'currentColor'} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-solid pt-4" style={{ borderColor: 'var(--border-color)' }}>
         <button 
           className="btn btn-secondary w-full mb-4 justify-between" 
           onClick={handleRoleToggle}
           title="Toggle Role for testing"
         >
            <span className="flex items-center gap-2 text-sm text-muted">
              <Settings size={16} /> Mode: {role.toUpperCase()}
            </span>
         </button>

        <button style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          width: '100%', padding: '0.75rem 1rem',
          background: 'transparent', border: 'none',
          color: 'var(--accent-danger)', cursor: 'pointer',
          borderRadius: 'var(--radius-md)',
          fontWeight: 500, transition: 'background var(--transition-fast)'
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

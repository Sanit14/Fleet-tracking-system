import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';

const Header = ({ user, toggleSidebar }) => {
  return (
    <header className="header" style={{
      height: '73px',
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Left side: Hamburger and Search */}
      <div className="flex items-center gap-4">
        <button 
          className="btn-icon mobile-menu-btn" 
          onClick={toggleSidebar}
        >
          <Menu size={24} color="var(--text-primary)" />
        </button>

        {/* Search Bar */}
        <div className="search-bar" style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          backgroundColor: 'var(--bg-primary)',
          padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-color)',
          width: '300px',
          transition: 'border-color var(--transition-fast)'
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
        >
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search trucks, drivers..." 
            style={{
              background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--text-primary)', width: '100%', fontSize: '0.875rem'
            }}
          />
        </div>
      </div>

      {/* Right Side Tools */}
      <div className="flex items-center gap-4 lg:gap-6">
        <button className="btn-icon" style={{ position: 'relative' }}>
          <Bell size={20} />
          <span style={{
            position: 'absolute', top: '2px', right: '4px',
            width: '8px', height: '8px', backgroundColor: 'var(--accent-danger)',
            borderRadius: '50%', boxShadow: '0 0 0 2px var(--bg-secondary)'
          }}></span>
        </button>

        <div className="flex items-center gap-3 user-profile" style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem' }}>
          <div className="flex-col user-info" style={{ alignItems: 'flex-end', display: 'flex' }}>
            <span className="text-sm font-semibold">{user.name}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{user.role}</span>
          </div>
          <div style={{
            width: '36px', height: '36px', borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', flexShrink: 0
          }}>
             <User size={18} color="var(--text-secondary)" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

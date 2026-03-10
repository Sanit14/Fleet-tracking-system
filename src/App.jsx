import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import TruckList from './pages/TruckList';
import TruckDetails from './pages/TruckDetails';
import Tracking from './pages/Tracking';
import Analytics from './pages/Analytics';
import useStore from './store/useStore';
import { simulateMovements } from './lib/mockData';

function App() {
  const user = useStore(state => state.user);
  const locations = useStore(state => state.locations);
  const updateLocation = useStore(state => state.updateLocation);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  React.useEffect(() => {
    // Simulate real-time tracker movements every 3 seconds
    const interval = setInterval(() => {
      simulateMovements(() => useStore.getState().locations, updateLocation);
    }, 3000);
    return () => clearInterval(interval);
  }, [updateLocation]);

  return (
    <Router>
      <div className="app-container">
        {sidebarOpen && (
          <div 
            className="sidebar-overlay" 
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        
        <Sidebar 
          role={user.role} 
          isOpen={sidebarOpen} 
          closeSidebar={() => setSidebarOpen(false)} 
        />
        
        <div className="main-content">
          <Header 
            user={user} 
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          />
          
          <main className="page-wrapper">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Admin Only Routes */}
              <Route 
                path="/trucks" 
                element={user.role === 'admin' ? <TruckList /> : <Navigate to="/dashboard" />} 
              />
              
              <Route path="/trucks/:id" element={<TruckDetails />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

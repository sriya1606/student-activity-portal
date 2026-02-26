import { useState, useEffect } from 'react';

export default function AdminDashboard({ onLogout }) {
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({ title: '', category: 'Event', date: '', description: '' });
  
  // NEW STATE for View and Stats
  const [currentView, setCurrentView] = useState('events'); // 'events' or 'students'
  const [stats, setStats] = useState({ totalUsers: 0, activityStats: [], recentRegistrations: [] });

  const fetchActivities = () => {
    fetch('http://localhost:5000/api/activities')
      .then(res => res.json())
      .then(data => setActivities(data));
  };

  // Fetch Stats for Admin
  const fetchStats = () => {
    fetch('http://localhost:5000/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  };

  useEffect(() => { 
    fetchActivities(); 
    fetchStats(); 
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/admin/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then(() => {
      setFormData({ title: '', category: 'Event', date: '', description: '' });
      fetchActivities();
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '220px', background: '#0f172a', color: 'white', padding: '16px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(to top right, #4f46e5, #ec4899)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <div>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 'bold' }}>Admin</h2>
            <p style={{ color: '#64748b', fontSize: '10px' }}>Panel</p>
          </div>
        </div>
        
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {/* Events Button */}
          <button 
            onClick={() => setCurrentView('events')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '8px', 
              background: currentView === 'events' ? 'linear-gradient(to right, #4f46e5, #7c3aed)' : 'transparent',
              color: 'white', border: 'none', cursor: 'pointer', textAlign: 'left'
            }}
          >
            <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Manage Events</span>
          </button>

          {/* Students Button - NOW FUNCTIONAL */}
          <button 
            onClick={() => { setCurrentView('students'); fetchStats(); }}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '8px', 
              background: currentView === 'students' ? 'linear-gradient(to right, #4f46e5, #7c3aed)' : 'transparent',
              color: 'white', border: 'none', cursor: 'pointer', textAlign: 'left'
            }}
          >
            <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Student Stats</span>
          </button>
        </nav>

        <button onClick={onLogout} style={{ marginTop: 'auto', padding: '10px', background: '#1e293b', border: 'none', borderRadius: '8px', color: '#94a3b8', cursor: 'pointer', fontSize: '11px' }}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        
        {/* VIEW 1: MANAGE EVENTS (Default) */}
        {currentView === 'events' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px' }}>Create Activity</h1>
            
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <input 
                    type="text" placeholder="Title" required
                    style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px' }}
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                  <select 
                    style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', background: 'white' }}
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option>Event</option><option>Sports</option><option>Club</option>
                  </select>
                </div>
                <input 
                  type="date" required
                  style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px' }}
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
                <button type="submit" style={{ padding: '10px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Publish Activity
                </button>
              </form>
            </div>

            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Current Activities</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activities.map(act => (
                <div key={act.id} style={{ background: 'white', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{act.title}</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>{act.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: STUDENT STATS (New) */}
        {currentView === 'students' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px' }}>Student Insights</h1>
            
            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', padding: '20px', borderRadius: '12px', color: 'white' }}>
                <p style={{ fontSize: '12px', opacity: 0.9 }}>Total Registered Users</p>
                <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '8px 0 0 0' }}>{stats.totalUsers}</p>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)', padding: '20px', borderRadius: '12px', color: 'white' }}>
                <p style={{ fontSize: '12px', opacity: 0.9 }}>Total Event Sign-ups</p>
                <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '8px 0 0 0' }}>{stats.totalRegistrations}</p>
              </div>
            </div>

            {/* Activity Wise Stats */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>Registrations per Activity</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {stats.activityStats.map((stat, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: '#f8fafc', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: stat.category === 'Sports' ? '#22c55e' : stat.category === 'Club' ? '#3b82f6' : '#a855f7' }}></div>
                      <span style={{ fontSize: '12px', fontWeight: '500' }}>{stat.title}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '100px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${stat.registrations * 20}%`, maxWidth: '100%', height: '100%', background: '#4f46e5' }}></div>
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#4f46e5' }}>{stat.registrations} Students</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{ marginTop: '24px', background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>Recent Sign-ups</h3>
              {stats.recentRegistrations.length === 0 ? (
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>No registrations yet.</p>
              ) : (
                stats.recentRegistrations.map((reg, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
                      {reg.studentName.charAt(0)}
                    </div>
                    <span style={{ fontSize: '12px' }}><b>{reg.studentName}</b> joined <b>{reg.activityTitle}</b></span>
                  </div>
                ))
              )}
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
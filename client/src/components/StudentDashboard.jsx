import { useState, useEffect } from 'react';

export default function StudentDashboard({ user, onLogout }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/activities')
      .then(res => res.json())
      .then(data => setActivities(data));
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', color: '#1e293b' }}>
      {/* Navigation */}
      <nav style={{ background: 'white', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '28px', height: '28px', background: 'linear-gradient(to top right, #4f46e5, #ec4899)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               {/* TINY ICON */}
              <svg style={{ width: '14px', height: '14px', color: 'white' }} fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"></path></svg>
            </div>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>UniPortal</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={user.avatar} alt="Profile" style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #e5e7eb' }} />
            <button onClick={onLogout} style={{ padding: '6px', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '50%' }}>
              {/* TINY ICON */}
              <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Banner - FORCED GRADIENT COLOR */}
      <div style={{ background: 'linear-gradient(to right, #4f46e5, #ec4899)', color: 'white', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>Welcome, {user.name.split(' ')[0]}!</h1>
          <p style={{ color: '#e0e7ff', fontSize: '12px' }}>You have <span style={{ fontWeight: 'bold', color: 'white' }}>{activities.length} activities</span> available.</p>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Activities</h2>
        
        {/* Card Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {activities.map((activity) => (
            <div key={activity.id} style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', overflow: 'hidden', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' }}>
              
              {/* Color Header */}
              <div style={{ height: '6px', width: '100%', background: activity.category === 'Sports' ? '#22c55e' : activity.category === 'Club' ? '#3b82f6' : '#a855f7' }}></div>
              
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ 
                    padding: '2px 8px', 
                    fontSize: '10px', 
                    fontWeight: 'bold', 
                    textTransform: 'uppercase', 
                    borderRadius: '4px', 
                    color: activity.category === 'Sports' ? '#15803d' : activity.category === 'Club' ? '#1d4ed8' : '#6b21a8',
                    background: activity.category === 'Sports' ? '#f0fdf4' : activity.category === 'Club' ? '#eff6ff' : '#faf5ff'
                  }}>
                    {activity.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#9ca3af', fontSize: '10px', fontWeight: '500' }}>
                    {/* TINY ICON */}
                    <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    {activity.date}
                  </div>
                </div>
                
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>{activity.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '16px', flex: 1 }}>{activity.description}</p>
                
                {/* FORCED COLOR BUTTON */}
                <button 
                                    onClick={() => {
                    fetch('http://localhost:5000/api/register-event', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ 
                          studentName: user.name, 
                          activityId: activity.id,
                          activityTitle: activity.title
                      })
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.success) {
                            alert(`Successfully registered for ${activity.title}!`);
                        } else {
                            alert(data.message);
                        }
                    });
                  }}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    fontWeight: '600', 
                    borderRadius: '8px', 
                    fontSize: '11px', 
                    color: 'white', 
                    border: 'none', 
                    cursor: 'pointer',
                    background: activity.category === 'Sports' ? '#22c55e' : activity.category === 'Club' ? '#3b82f6' : '#a855f7'
                  }}
                
                 
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
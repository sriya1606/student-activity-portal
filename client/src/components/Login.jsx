import { useState } from 'react';

export default function Login({ onLogin }) {
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!name || !password) return alert("Please enter both Name and Password!");
    
    setLoading(true);

    try {
      // Send data to backend
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, password, role })
      });

      const data = await response.json();

      if (data.success) {
        // Pass user data to App.jsx
        onLogin({ 
          role: data.user.role, 
          name: name,
          avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
          isNew: data.isNew // Tell dashboard if user is new
        });
      } else {
        alert(data.message); // Show error message from server
      }
    } catch (error) {
      alert("Could not connect to server. Is it running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom right, #4f46e5, #9333ea, #ec4899)', padding: '16px' }}>
      
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '32px', border: '1px solid rgba(255,255,255,0.5)' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to top right, #4f46e5, #9333ea)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', margin: '0 auto 12px auto', transform: 'rotate(3deg)' }}>
              <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
              UniPortal
            </h1>
            <p style={{ color: '#9ca3af', marginTop: '4px', fontSize: '14px' }}>Sign in to continue</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Role Selection */}
            <div style={{ background: '#f9fafb', padding: '4px', borderRadius: '12px', display: 'flex', gap: '4px' }}>
              <button
                type="button"
                onClick={() => setRole('student')}
                style={{ 
                  width: '50%', 
                  padding: '8px', 
                  borderRadius: '8px', 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  border: 'none', 
                  cursor: 'pointer',
                  background: role === 'student' ? 'white' : 'transparent',
                  color: role === 'student' ? '#4f46e5' : '#9ca3af',
                  boxShadow: role === 'student' ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' : 'none'
                }}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                style={{ 
                  width: '50%', 
                  padding: '8px', 
                  borderRadius: '8px', 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  border: 'none', 
                  cursor: 'pointer',
                  background: role === 'admin' ? 'white' : 'transparent',
                  color: role === 'admin' ? '#4f46e5' : '#9ca3af',
                  boxShadow: role === 'admin' ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' : 'none'
                }}
              >
                Admin
              </button>
            </div>

            {/* Name Input */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>
                {role === 'admin' ? 'Admin Username' : 'Student Name'}
              </label>
              <input 
                type="text" 
                style={{ width: '100%', padding: '10px 12px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', outline: 'none', fontSize: '14px', color: '#374151', boxSizing: 'border-box' }}
                placeholder={role === 'admin' ? "Enter admin username" : "Enter your full name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Password Input (NEW) */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>
                Password
              </label>
              <input 
                type="password" 
                style={{ width: '100%', padding: '10px 12px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', outline: 'none', fontSize: '14px', color: '#374151', boxSizing: 'border-box' }}
                placeholder={role === 'admin' ? "Enter admin password" : "Create or enter your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {role === 'student' && (
                <p style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>
                  * First time? Enter a new password to register.
                </p>
              )}
               {role === 'admin' && (
                <p style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>
                  * Default password: <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>admin123</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '10px', background: 'linear-gradient(to right, #4f46e5, #ec4899)', color: 'white', fontWeight: 'bold', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', border: 'none', cursor: 'pointer', fontSize: '14px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
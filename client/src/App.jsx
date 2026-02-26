import { useState } from 'react'
import Login from './components/Login'
import StudentDashboard from './components/StudentDashboard'
import AdminDashboard from './components/AdminDashboard'

function App() {
  const [user, setUser] = useState(null) // Stores { role: 'student' } or { role: 'admin' }

  // If no user is logged in, show Login screen
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-100 to-white flex items-center justify-center">
        <Login onLogin={setUser} />
      </div>
    )
  }

  // Show dashboard based on role
  return (
    <div className="min-h-screen bg-background">
      {user.role === 'student' ? 
        <StudentDashboard user={user} onLogout={() => setUser(null)} /> : 
        <AdminDashboard onLogout={() => setUser(null)} />
      }
    </div>
  )
}

export default App
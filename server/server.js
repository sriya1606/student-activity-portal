const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- DATA STORAGE ---

let activities = [
    { id: 1, title: "Coding Club Meetup", category: "Club", date: "2023-12-15", description: "Learn React with seniors." },
    { id: 2, title: "Inter-College Football", category: "Sports", date: "2023-12-20", description: "Finals at main ground." },
    { id: 3, title: "Winter Music Fest", category: "Event", date: "2023-12-25", description: "Live band performances." }
];

// Stores students who created an account
let registeredStudents = []; 

// Stores which student registered for which event
// Format: { studentName: "John", activityId: 1, activityTitle: "Coding Club" }
let eventRegistrations = []; 

// --- ROUTES ---

// 1. Get all activities
app.get('/api/activities', (req, res) => {
    res.json(activities);
});

// 2. Login / Register Logic
app.post('/api/login', (req, res) => {
    const { username, password, role } = req.body;

    if (role === 'admin') {
        if (password === 'admin123') {
            return res.json({ success: true, user: { name: username, role: 'admin' } });
        } else {
            return res.status(401).json({ success: false, message: "Wrong Admin Password!" });
        }
    }

    if (role === 'student') {
        const existingUser = registeredStudents.find(u => u.username === username);
        if (existingUser) {
            if (existingUser.password === password) {
                return res.json({ success: true, user: { name: username, role: 'student' } });
            } else {
                return res.status(401).json({ success: false, message: "Incorrect Password!" });
            }
        } else {
            registeredStudents.push({ username, password });
            return res.json({ success: true, user: { name: username, role: 'student' } });
        }
    }
});

// 3. Student Registers for an Event
app.post('/api/register-event', (req, res) => {
    const { studentName, activityId, activityTitle } = req.body;
    
    // Check if already registered
    const exists = eventRegistrations.find(r => r.studentName === studentName && r.activityId === activityId);
    if (exists) {
        return res.status(400).json({ success: false, message: "Already registered!" });
    }

    eventRegistrations.push({ studentName, activityId, activityTitle });
    console.log(`${studentName} registered for ${activityTitle}`);
    res.json({ success: true });
});

// 4. Admin: Get Statistics
app.get('/api/admin/stats', (req, res) => {
    // Calculate counts for each activity
    const stats = activities.map(act => {
        const count = eventRegistrations.filter(r => r.activityId === act.id).length;
        return {
            title: act.title,
            category: act.category,
            registrations: count
        };
    });

    res.json({ 
        totalUsers: registeredStudents.length, 
        totalRegistrations: eventRegistrations.length,
        activityStats: stats,
        recentRegistrations: eventRegistrations.slice(-5).reverse() // Last 5 registrations
    });
});

// 5. Admin: Add new activity
app.post('/api/admin/add', (req, res) => {
    const newActivity = { id: activities.length + 1, ...req.body };
    activities.push(newActivity);
    res.json(newActivity);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
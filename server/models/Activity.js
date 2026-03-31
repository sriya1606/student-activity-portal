// models/Activity.js
const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    participants: [
        {
            studentName: String,
            studentId: String
        }
    ]
});

module.exports = mongoose.model('Activity', ActivitySchema);
const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

const app = express();
const authRoutes = require('./routes/authRoutes');

// Add after other middlewares
app.use('/api/auth', authRoutes);

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

module.exports = app;

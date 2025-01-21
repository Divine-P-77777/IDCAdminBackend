import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import studentRoutes from './routes/students.js';
import activityRoutes from './routes/activities.js';
import achievementRoutes from './routes/achievements.js';
import visitedRoutes from './routes/visiteds.js';
import slideRoutes from './routes/slides.js';
import momentRoutes from './routes/moments.js';
import academicCentresRouter from './routes/academicCentres.js';
import noticeRoutes from './routes/notice.js'; // Import the notice routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
    res.send("All is Well");
});

// Health API
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Use route files
app.use('/api/notices', noticeRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/visiteds', visitedRoutes);
app.use('/api/slides', slideRoutes);
app.use('/api/moments', momentRoutes);
app.use('/api/academic-centres', academicCentresRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

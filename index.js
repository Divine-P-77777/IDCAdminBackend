import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import routes
import studentRoutes from './routes/students.js';
import activityRoutes from './routes/activities.js';
import achievementRoutes from './routes/achievements.js';
import visitedRoutes from './routes/visiteds.js';
import slideRoutes from './routes/slides.js';
import momentRoutes from './routes/moments.js';
import academicCentresRouter from './routes/academicCentres.js';
import noticeRoutes from './routes/notice.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5174';

// Middleware
app.use(cors({ origin: CORS_ORIGIN, credentials: true })); // Enabling CORS with specified origin
app.use(express.json()); // Parsing JSON body requests

// MongoDB connection with improved logging
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Test route to verify server is working
app.get('/', (req, res) => {
    res.send("All is Well - Server is running!");
});


// Root Route (for the root page after deployment)
app.get("/", (req, res) => {
    res.status(200).send("All is Well");
});

// Health Check Route
app.get("/health", (req, res) => {
    res.status(200).send("Healthy");
});

// Self-Ping Mechanism to Keep Server Active
const SELF_URL = "https://idc-admin-backend.vercel.app/"; // Replace with your deployed backend URL
setInterval(() => {
    axios
        .get(`${SELF_URL}`)
        .then(() => console.log("Self-ping successful!"))
        .catch((err) => console.error("Self-ping failed:", err.message));
}, 300000); // Ping every 5 minutes


// Routes setup
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

// Error-handling middleware for invalid routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error-handling middleware for unexpected server errors
app.use((err, req, res, next) => {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'An unexpected error occurred' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

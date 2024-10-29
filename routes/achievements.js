// Import necessary modules
import express from 'express';
import Achievement from '../models/Achievement.js';

const router = express.Router();

// Get all achievements
router.get('/', async (req, res) => {
    try {
        const achievements = await Achievement.find().sort({ index: 1 });
        res.status(200).json(achievements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new achievement
router.post('/', async (req, res) => {
    const { date, description, media, mediaType, index } = req.body;

    if (!date || !description || !media || !mediaType || index === undefined) {
        return res.status(400).json({ message: 'All fields (date, description, media, mediaType, index) are required.' });
    }

    const urlPattern = new RegExp('^(https?://)');
    if (!urlPattern.test(media)) {
        return res.status(400).json({ message: 'Invalid URL format.' });
    }

    const achievement = new Achievement({
        date,
        description: [description],
        media,
        mediaType,
        index,
    });

    try {
        await achievement.save();
        res.status(201).json(achievement);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete achievement by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAchievement = await Achievement.findByIdAndDelete(id);
        if (!deletedAchievement) {
            return res.status(404).json({ message: 'Achievement not found' });
        }
        res.status(200).json({ message: 'Achievement deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

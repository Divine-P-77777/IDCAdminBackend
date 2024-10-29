import express from 'express';
import Activity from '../models/Activity.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const activities = await Activity.find().sort({ index: 1 });
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const activity = new Activity(req.body);
    try {
        await activity.save();
        res.status(201).json(activity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Delete Activity by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedActivity = await Activity.findByIdAndDelete(id);
        if (!deletedActivity) {
            return res.status(404).json({ message: "Activity not found" });
        }
        res.status(200).json(deletedActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Activity by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedActivity) {
            return res.status(404).json({ message: "Activity not found" });
        }
        res.status(200).json(updatedActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// More routes (update, delete) go here

export default router;

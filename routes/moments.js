import express from 'express';
import Moment from '../models/Moment.js';

const router = express.Router();

// Fetch all moments, sorted by position index
router.get('/', async (req, res) => {
    try {
        const moments = await Moment.find().sort({ index: 1 });
        res.status(200).json(moments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new moment
router.post('/', async (req, res) => {
    const moment = new Moment(req.body);
    try {
        await moment.save();
        res.status(201).json(moment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an existing moment
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMoment = await Moment.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMoment) return res.status(404).json({ message: 'Moment not found' });
        res.status(200).json(updatedMoment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a moment
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMoment = await Moment.findByIdAndDelete(id);
        if (!deletedMoment) return res.status(404).json({ message: 'Moment not found' });
        res.status(200).json({ message: 'Moment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

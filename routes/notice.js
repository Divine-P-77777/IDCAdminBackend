import express from 'express';
import Notice from '../models/Notice.js';

const router = express.Router();

// Get all notices
router.get('/', async (req, res) => {
    try {
        const notices = await Notice.find();
        res.json(notices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new notice
router.post('/', async (req, res) => {
    const { heading, content, position } = req.body;

    const notice = new Notice({ heading, content, position });
    try {
        const savedNotice = await notice.save();
        res.status(201).json(savedNotice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an existing notice
router.put('/:id', async (req, res) => {
    try {
        const updatedNotice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedNotice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a notice
router.delete('/:id', async (req, res) => {
    try {
        await Notice.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router; // Make sure to have this export

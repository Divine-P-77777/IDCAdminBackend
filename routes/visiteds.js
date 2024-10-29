import express from 'express';
import Visited from '../models/Visited.js';

const router = express.Router();

// GET all visited shows, sorted by index
router.get('/', async (req, res) => {
    try {
        const visited = await Visited.find().sort({ index: 1 });
        res.status(200).json(visited);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new visited show
router.post('/', async (req, res) => {
    const visited = new Visited(req.body);
    try {
        await visited.save();
        res.status(201).json(visited);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a visited show by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Visited.findByIdAndDelete(id);
        res.status(200).json({ message: 'Visited show deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT (Update) a visited show by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedShow = await Visited.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedShow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;

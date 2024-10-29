import express from 'express';
import Slide from '../models/Slide.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const slides = await Slide.find().sort({ index: 1 });
        res.status(200).json(slides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    console.log("Received data:", req.body); // Log the request body
    const slide = new Slide(req.body);
    try {
        await slide.save();
        res.status(201).json(slide);
    } catch (error) {
        console.error('Error saving slide:', error); // Log the error for debugging
        res.status(400).json({ message: error.message });
    }
});

// Delete a slide by ID
router.delete('/:id', async (req, res) => {
    try {
        const slide = await Slide.findByIdAndDelete(req.params.id);
        if (!slide) {
            return res.status(404).json({ message: 'Slide not found' });
        }
        res.status(200).json({ message: 'Slide deleted successfully' });
    } catch (error) {
        console.error('Error deleting slide:', error); // Log the error for debugging
        res.status(500).json({ message: error.message });
    }
});

// Update a slide by ID
router.put('/:id', async (req, res) => {
    try {
        const slide = await Slide.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!slide) {
            return res.status(404).json({ message: 'Slide not found' });
        }
        res.status(200).json(slide);
    } catch (error) {
        console.error('Error updating slide:', error); // Log the error for debugging
        res.status(400).json({ message: error.message });
    }
});

export default router;

// routes/academicCentres.js
import express from 'express';
import AcademicCentre from '../models/AcademicCentre.js';

const router = express.Router();

// Get all academic centres
router.get('/', async (req, res) => {
    try {
        const centres = await AcademicCentre.find();
        res.json(centres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new academic centre
router.post('/', async (req, res) => {
    const { name } = req.body;
    const newCentre = new AcademicCentre({ name });
    
    try {
        const savedCentre = await newCentre.save();
        res.status(201).json(savedCentre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an academic centre
router.put('/:id', async (req, res) => {
    try {
        const updatedCentre = await AcademicCentre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCentre) return res.status(404).json({ message: 'Centre not found' });
        res.json(updatedCentre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Toggle the open/closed status of an academic centre
router.patch('/:id/toggle', async (req, res) => {
    try {
        const centre = await AcademicCentre.findById(req.params.id);
        if (!centre) return res.status(404).json({ message: 'Centre not found' });

        centre.isOpen = !centre.isOpen; // Toggle the status
        const updatedCentre = await centre.save(); // Save the updated centre
        res.json(updatedCentre); // Send back the updated centre
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete an academic centre
router.delete('/:id', async (req, res) => {
    try {
        const deletedCentre = await AcademicCentre.findByIdAndDelete(req.params.id);
        if (!deletedCentre) return res.status(404).json({ message: 'Centre not found' });

        res.json({ message: 'Centre deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

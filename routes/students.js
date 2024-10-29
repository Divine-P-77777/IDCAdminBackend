import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new student
router.post('/', async (req, res) => {
    const student = new Student(req.body);
    try {
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get a student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a student
router.put('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a student
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ message: 'Student deleted' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the student' });
    }
});

export default router;

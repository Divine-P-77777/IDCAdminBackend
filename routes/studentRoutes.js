import express from 'express';
import * as studentController from '../controllers/studentController.js';

const router = express.Router();

// Define CRUD routes for students
router.get('/', studentController.getAllStudents);
router.post('/', studentController.createStudent);
router.get('/:id', studentController.getStudentById);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

export default router;

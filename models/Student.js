import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    institution: { type: String, required: true },
    dob: { type: String, required: true },
    parentName: { type: String, required: true },
    address: { type: String, required: true },
    whatsapp: { type: String, required: true },
    phone: { type: String, required: true },
    healthIssues: { type: String, required: false },
    healthDescription: { type: String, required: false },
    academicCentre: { type: String, required: true },
    passportPhoto: { type: String, required: true },
    classes: { type: [String], required: true }, // Array of classes
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

export default Student;

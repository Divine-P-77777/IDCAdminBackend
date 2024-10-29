// models/academicCentre.js
import mongoose from 'mongoose';

const academicCentreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isOpen: { type: Boolean, default: false }, // to toggle open/closed status
}, { timestamps: true });

const AcademicCentre = mongoose.model('AcademicCentre', academicCentreSchema);
export default AcademicCentre;

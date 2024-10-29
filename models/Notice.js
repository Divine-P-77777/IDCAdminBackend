import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    position: {
        type: Number,
        required: true,
        unique: true, // Enforce unique constraint on position
    },
}, { timestamps: true });

const Notice = mongoose.model('Notice', NoticeSchema);

// Ensure this line is present to export the model as the default export
export default Notice;

import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema({
    url: { type: String, required: true },
    url: { type: String, required: true },
    index: { type: Number, required: true, default: 0 },  // Manage order
});

const Slide = mongoose.model('Slide', slideSchema);
export default Slide;

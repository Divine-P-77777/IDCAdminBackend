import mongoose from 'mongoose';

const momentSchema = new mongoose.Schema({
    image: { type: String, required: true },
    description: { type: String, required: true },
    realityshow: { type: String, required: true },
    index: { type: Number, required: true, default: 0 },  // Manage order
});

const Moment = mongoose.model('Moment', momentSchema);
export default Moment;

import mongoose from 'mongoose';

const visitedSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String, required: true },
    index: { type: Number, required: true, default: 0 },  // Manage order
});

const Visited = mongoose.model('Visited', visitedSchema);
export default Visited;
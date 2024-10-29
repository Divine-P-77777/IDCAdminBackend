import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Ensures no duplicate names
    logo: { type: String, required: true }, // URL or Base64 string for the logo
    index: { type: Number, required: true, unique: true, default: 0 }, // Manage order with uniqueness
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the document was created
    updatedAt: { type: Date, default: Date.now } // Timestamp for when the document was last updated
});

// Middleware to update the 'updatedAt' field
activitySchema.pre('save', function (next) {
    this.updatedAt = Date.now(); // Update the timestamp before saving
    next();
});

// Create the Activity model
const Activity = mongoose.model('Activity', activitySchema);
export default Activity;

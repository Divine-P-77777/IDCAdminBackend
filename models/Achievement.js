import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
   
    date: { type: String, required: true },
    description: { type: [String], required: true },
    media: { type: String, required: true },
    mediaType: {type: String, required: true},
  
    index: { type: Number, required: true, default: 0 },  // Manage order
});

const Achievement = mongoose.model('Achievement', achievementSchema);
export default Achievement;

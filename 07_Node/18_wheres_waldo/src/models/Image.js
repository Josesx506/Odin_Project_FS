import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true // ✅ Automatically adds createdAt and updatedAt
});

// Export the model
export default mongoose.models.Image || mongoose.model('Image', ImageSchema);
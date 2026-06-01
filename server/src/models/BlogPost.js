import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, trim: true, default: '' },
    content: { type: String, required: true },
    image: { type: String, default: '' },
    author: { type: String, default: 'MediCare Team' },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('BlogPost', blogPostSchema);

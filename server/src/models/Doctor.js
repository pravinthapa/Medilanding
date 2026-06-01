import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema(
  {
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { _id: false }
);

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true },
    qualification: { type: String, trim: true },
    experience: { type: Number, default: 0 },
    bio: { type: String, trim: true },
    image: { type: String, default: '' },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    availability: [availabilitySchema],
  },
  { timestamps: true }
);

export default mongoose.model('Doctor', doctorSchema);

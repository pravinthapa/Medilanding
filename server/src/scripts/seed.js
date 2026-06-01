import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import BlogPost from '../models/BlogPost.js';
import { connectDB } from '../config/db.js';

const doctors = [
  {
    name: 'Dr. Sarah Mitchell',
    specialization: 'Cardiology',
    qualification: 'MD, FACC',
    experience: 15,
    bio: 'Expert in preventive cardiology and heart disease management.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    availability: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00' },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
    ],
  },
  {
    name: 'Dr. James Chen',
    specialization: 'Neurology',
    qualification: 'MD, PhD',
    experience: 12,
    bio: 'Specializes in neurological disorders and stroke rehabilitation.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    availability: [
      { day: 'Tuesday', startTime: '10:00', endTime: '18:00' },
      { day: 'Thursday', startTime: '10:00', endTime: '18:00' },
    ],
  },
  {
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrics',
    qualification: 'MD, FAAP',
    experience: 10,
    bio: 'Compassionate care for infants, children, and adolescents.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
    availability: [
      { day: 'Monday', startTime: '08:00', endTime: '16:00' },
      { day: 'Friday', startTime: '08:00', endTime: '16:00' },
    ],
  },
  {
    name: 'Dr. Michael Thompson',
    specialization: 'Orthopedics',
    qualification: 'MD, FAAOS',
    experience: 18,
    bio: 'Sports medicine and joint replacement specialist.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
    availability: [
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
      { day: 'Saturday', startTime: '09:00', endTime: '13:00' },
    ],
  },
];

const blogPosts = [
  {
    title: '5 Tips for Heart-Healthy Living',
    slug: 'heart-healthy-living-tips',
    excerpt: 'Simple lifestyle changes that can protect your cardiovascular health.',
    content:
      'Maintaining heart health starts with daily habits: eat a balanced diet rich in vegetables, exercise regularly, manage stress, avoid smoking, and schedule annual checkups with your cardiologist.',
    author: 'Dr. Sarah Mitchell',
    isPublished: true,
  },
  {
    title: 'When to Bring Your Child to the Pediatrician',
    slug: 'when-to-visit-pediatrician',
    excerpt: 'Know the signs that warrant a pediatric visit beyond routine checkups.',
    content:
      'Persistent fever, unusual rashes, breathing difficulties, or prolonged illness should prompt a visit. Regular wellness visits help track growth and development milestones.',
    author: 'Dr. Emily Rodriguez',
    isPublished: true,
  },
];

const seed = async () => {
  await connectDB();

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@clinic.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  await User.deleteMany({});
  await Doctor.deleteMany({});
  await BlogPost.deleteMany({});

  await User.create({
    name: 'Clinic Admin',
    email: adminEmail,
    password: adminPassword,
    role: 'admin',
  });

  await Doctor.insertMany(doctors);
  await BlogPost.insertMany(blogPosts);

  console.log('Seed completed!');
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
  await mongoose.connection.close();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

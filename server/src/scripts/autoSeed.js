import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import BlogPost from '../models/BlogPost.js';

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
];

const blogPosts = [
  {
    title: '5 Tips for Heart-Healthy Living',
    slug: 'heart-healthy-living-tips',
    excerpt: 'Simple lifestyle changes that protect your cardiovascular health.',
    content: 'Maintaining heart health starts with daily habits: balanced diet, exercise, stress management, and regular checkups.',
    author: 'Dr. Sarah Mitchell',
    isPublished: true,
  },
];

export const autoSeedIfEmpty = async () => {
  const userCount = await User.countDocuments();
  if (userCount > 0) return;

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@clinic.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  await User.create({
    name: 'Clinic Admin',
    email: adminEmail,
    password: adminPassword,
    role: 'admin',
  });

  const doctorCount = await Doctor.countDocuments();
  if (doctorCount === 0) await Doctor.insertMany(doctors);

  const blogCount = await BlogPost.countDocuments();
  if (blogCount === 0) await BlogPost.insertMany(blogPosts);

  console.log(`🌱 Auto-seeded database (admin: ${adminEmail} / ${adminPassword})`);
};

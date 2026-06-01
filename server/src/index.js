import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { autoSeedIfEmpty } from './scripts/autoSeed.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blog', blogRoutes);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await connectDB();
  await autoSeedIfEmpty();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start().catch((err) => {
  console.error('\n❌ Failed to start server:', err.message);
  const uri = process.env.MONGODB_URI || '';
  if (uri.includes('127.0.0.1') || uri.includes('localhost')) {
    console.error('\n📌 Fix: Local MongoDB is not running.');
    console.error('   1. Open server/.env');
    console.error('   2. Set MONGODB_URI to your MongoDB Atlas connection string');
    console.error('   3. Run: npm run check-db --prefix server');
    console.error('   4. Run: npm run seed && npm run dev\n');
    console.error('   Guide: docs/MONGODB_ATLAS_SETUP.md\n');
  }
  process.exit(1);
});

import 'dotenv/config';
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('❌ MONGODB_URI is missing in server/.env');
  process.exit(1);
}

console.log('Testing connection...');
console.log('URI:', uri.replace(/:([^:@/]+)@/, ':****@'));

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  console.log('✅ MongoDB connected successfully!');
  await mongoose.connection.close();
  process.exit(0);
} catch (err) {
  console.error('❌ Connection failed:', err.message);
  if (uri.includes('127.0.0.1') || uri.includes('localhost')) {
    console.error('\n→ Local MongoDB is not running.');
    console.error('→ Use MongoDB Atlas: see docs/MONGODB_ATLAS_SETUP.md');
    console.error('→ Paste mongodb+srv://... into server/.env as MONGODB_URI');
  }
  process.exit(1);
}

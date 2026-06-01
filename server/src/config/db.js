import mongoose from 'mongoose';

let memoryServer = null;

export const connectDB = async () => {
  let uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/medilanding';
  const useMemory =
    process.env.USE_IN_MEMORY_DB === 'true' ||
    uri === 'memory' ||
    uri === 'mongodb://memory';

  if (useMemory) {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    uri = memoryServer.getUri('medilanding');
    console.log('📦 Using in-memory MongoDB (dev only — data resets when server stops)');
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: useMemory ? 30000 : 10000 });
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    if (!useMemory && (uri.includes('127.0.0.1') || uri.includes('localhost'))) {
      console.warn('⚠️  Local MongoDB failed. Starting in-memory database instead...');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      memoryServer = await MongoMemoryServer.create();
      uri = memoryServer.getUri('medilanding');
      await mongoose.connect(uri);
      console.log('📦 In-memory MongoDB connected (dev fallback)');
      return;
    }
    throw err;
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
};

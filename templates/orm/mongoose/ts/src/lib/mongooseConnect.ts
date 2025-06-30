import mongoose from 'mongoose';

export function connect(): void {
  mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB connection failed', err));
}

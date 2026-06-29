import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

import authRoutes from './src/routes/auth.js';
import aiRoutes from './src/routes/aiRoutes.js';
import stockRoutes from './src/routes/stockRoutes.js';
import docRoutes from './src/routes/docRoutes.js';
import watchlistRoutes from './src/routes/watchlistRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/docs', docRoutes);
app.use('/api/watchlist', watchlistRoutes);


import { MongoMemoryServer } from 'mongodb-memory-server';

// Connect to DB and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.log('No MONGO_URI provided, starting in-memory MongoDB...');
      // Start server first so it doesn't block on DB download timeout
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
    } else {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

startServer();

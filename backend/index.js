import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/blogRouter.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = 5000;

const __dirname = path.resolve();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/Blog")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

app.use('/api', router);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Catch-all handler: send back React's index.html file for SPA routing
// This should be last to catch all non-API routes

// curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
// sudo apt install -y nodejs

app.use((req, res) => {
  // Don't serve index.html for API routes (should already be handled above)
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
  } else {
    res.status(404).json({ error: 'API route not found' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
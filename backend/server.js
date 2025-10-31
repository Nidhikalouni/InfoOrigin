import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { router as authRouter } from './routes/route.js';
import adminRoute from './routes/adminRoute.js';
import { reviewerRoute } from './routes/reviewerRoute.js';
import pdfRouter from './routes/pdfRoutes.js';
import { swaggerDocs } from './swagger.js';

const app = express();

// Connect DB
await connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigin = ['http://localhost:5173','http://localhost:5174'];
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));


app.use('/api/auth', authRouter);
app.use('/api/admin', adminRoute);
app.use('/api/reviewer', reviewerRoute);
app.use('/api/pdf', pdfRouter);

app.get('/', (req, res) => res.send('Welcome to Express app'));

// Initialize Swagger docs 
swaggerDocs(app);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

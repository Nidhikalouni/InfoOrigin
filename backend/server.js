import 'dotenv/config'; 
import express from 'express';
import { connectDB } from './config/db.js';

import cookieParser from 'cookie-parser';

import cors from 'cors';
import {router} from './routes/route.js';

const app = express();

// Connect to database
await connectDB();

// Middleware
app.use(express.json());

app.use(cookieParser());

// CORS setup
const allowedOrigin = 'http://localhost:5173';
app.use(cors({
    origin: allowedOrigin,
    credentials: true
}));


// Routes
app.use('/api/auth', router);
app.get('/',(req,res)=>{
    res.send('Welcome to Express app');
})


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

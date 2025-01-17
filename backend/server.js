import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudnary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/UserRoute.js';


const app = express();
const port = process.env.PORT || 4000;

// Database and Cloudinary Configuration
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// Routes

app.use('/api/admin', adminRouter);
app.use('/api/doctor',doctorRouter);
app.use('/api/user',userRouter)

// Test Endpoint
app.get('/', (req, res) => {
    res.send('API WORKING');
    console.log('API WORKING');
});

// Start Server
app.listen(port, () => console.log(`Server started on port ${port}`));

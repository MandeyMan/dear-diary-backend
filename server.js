const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRouter');
const diaryRoutes = require('./routes/diaryRoutes');
const emailRoutes = require('./routes/emailRoutes');
const cors = require('cors');

require('dotenv').config();

const app = express();

// CORS configuration
const allowedOrigins = [
    'http://localhost:3000',
    'https://dear-diary-frontend.onrender.com',
];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true, // Include credentials in the request if needed
}));

app.use(express.json());

connectDB();
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/diaries', diaryRoutes);
app.use('/api', emailRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App started successfully on port ${PORT}`);
});

const express  = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRouter');
const diaryRoutes = require('./routes/diaryRoutes');
const emailRoutes = require('./routes/emailRoutes');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors({
     origin: 'http://localhost:3000', // Allow your React app's origin
     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
     credentials: true, // Include credentials in the request if needed
   }));
   

app.use(express.json());

connectDB();
//routes
app.use('/api/auth' , authRoutes);
app.use('/api/diaries' , diaryRoutes);
app.use('/api', emailRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=>{
     console.log(`App started succefully ${PORT}`);
})
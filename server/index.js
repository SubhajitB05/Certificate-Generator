import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import adminRoutes from './routes/admin.route.js';


const app = express();

const PORT = process.env.PORT || 8008;
const URI = process.env.MONGOURI;

// Middlewares
app.use(cors({
    origin: ['https://asr-certificate-generator.vercel.app','http://localhost:5173'],
    methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/', adminRoutes);

// Connect to MongoDB
mongoose.connect(URI)
.then(()=>{
    console.log("MongoDB Connection Successful");
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch(()=>console.log("MongoDB Connection Failed"));
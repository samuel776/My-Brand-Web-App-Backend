import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import postsRoute from './routes/posts.js';
import authRoute from './routes/auth.js';

dotenv.config();

// Routes middlewares
const app = express();
app.use(express.json());

app.use('/posts', postsRoute);
app.use('/api/user',authRoute);


// Routes 
app.get('/',(req,res)=>{
    res.json({msg:'we are on home'});
});

// connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
   { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false } ,
).then(()=>{
    console.log('Connected to database')
}).catch((error)=>{
    console.log('Not connected')
})

// start listening to the server
app.listen(3000, ()=>console.log('server started successfully'));

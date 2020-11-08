import '@babel/polyfill'
import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import postsRoute from './routes/posts.js';
import authRoute from './routes/auth.js';
import cors from 'cors';


dotenv.config();

// Routes middlewares
const app = express();
app.use(express.json());
app.use(cors())

app.use('/posts', postsRoute);
app.use('/api/user',authRoute);


// Routes 
app.get('/',(req,res)=>{
    res.json({msg:'we are on home'});
});

// connect to DB
mongoose.connect(
    process.env.NODE_ENV==="test"?
      process.env.DB_CONNECTION_TEST:
    process.env.DB_CONNECTION,
   { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false } ,
).then(()=>{
    console.log('Connected to database')
}).catch((error)=>{
    console.log('Not connected')
})

// start listening to the server
 const port = process.env.PORT || 3000
app.listen(port, ()=>console.log('server started successfully'));
export default app;


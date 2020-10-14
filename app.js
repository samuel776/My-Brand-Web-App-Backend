const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');



// import routes
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');

// Routes middlewares

app.use(express.json());

app.use('/posts', postsRoute);
app.use('/api/user',authRoute);


// Routes 
app.get('/',(req,res)=>{
    res.send('we are on home');
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
app.listen(3000);

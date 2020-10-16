import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true ,
        min:5,
        max:200
    },
    email: { 
        type: String, 
        required: true, 
        unique: true ,
        max:200
    },
    password: { 
        type: String, 
        required: true,
        max:1024,
        min: 6
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  export default mongoose.model('User', userSchema);
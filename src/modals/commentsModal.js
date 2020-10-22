import joi from '@hapi/joi';
joi.string;
import mongoose from 'mongoose';

const commentsSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
    

  },
  email:{
    type: String,
    required: true
  },
  
  description: {
      type: String,
      required:true,
      min:100,

  } ,
  
  Date: {
      type: Date,
      default: Date.now,
      
  }
});


export default mongoose.model('Comments', commentsSchema);
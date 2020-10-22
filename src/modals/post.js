import  joi from '@hapi/joi';
joi.number;
import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required:true, 
        min:10,
        max:200
    },
    description: {
        type: String,
        required:true,
        min:100,

    } ,
    imageUrl:{
        type: String,
    },
    commentsNumber:{
        type:Number,
        default: 0
    },
    comments:[{
        type:mongoose.Types.ObjectId, ref:"Comments"
    }],
    views:{
        type: Number,
        default: 0
    },

    Date: {
        type: Date,
        default: Date.now,
        
    }
});

export default mongoose.model('Posts',postSchema);
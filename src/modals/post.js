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
    Date: {
        type: Date,
        default: Date.now,
        
    }
});

export default mongoose.model('Posts',postSchema);
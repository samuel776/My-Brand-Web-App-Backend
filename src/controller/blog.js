import Post from '../modals/post.js';
import {blogValidation} from '../routes/validation.js' 

export default {
    getAll: async (req, res)=>{
        try {
            const posts = await Post.find()
            if(!posts) return res.status(404).json({msg: 'No post found'})
            res.status(200).json(posts)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    getOne: async (req, res)=>{
        try {
            const {_id}= req.params
            const post = await Post.findById({_id})
            if(!post) return res.status(404).json({msg: 'No post found'})
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    createPost: async (req, res)=>{ 
        const {error} = blogValidation(req.body);
        if(error) return res.status(400).json({error: error.details[0].message});
        try {
         const {title, description,imageUrl} = req.body;
         const newPost = new Post({title, description,imageUrl})
         const savedPost = await newPost.save();
         res.status(201).json(savedPost)
        } catch (error) {
           res.status(500).json({error: error.message}) 
        }
     },

     deleteOne:async (req, res)=>{
        try {
            const {_id}=req.params;
            const deletedPost = await Post.findOneAndRemove({_id});
            res.status(200).json({mgs: 'post deleted successfully', deletedPost})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    updatePost:async (req, res)=>{
        try {
            const {_id}=req.params;
            const updatedPost = await Post.findByIdAndUpdate({_id},{
                title: req.body.title,
                description: req.body.description,
                imageUrl:req.body.imageUrl
            }, {new: true});
            res.status(200).json({msg: 'post updated successfully', updatedPost})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
} 
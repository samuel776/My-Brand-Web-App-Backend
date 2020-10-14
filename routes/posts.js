const express = require('express');
const PostSchema = require('./modals/post')
const router= express.Router();

//create => post method;
//Read => get method;
//Update => put/patch method;
//Delete => delete method

router.post('/', async (req, res)=>{ 
   try {
    const {title, description} = req.body;
    const newPost = new PostSchema({title, description})
    const savedPost = await newPost.save();
    res.status(201).json(savedPost)
   } catch (error) {
      res.status(500).json({error: error.message}) 
   }
})

router.get('/', async (req, res)=>{
    try {
        const posts = await PostSchema.find()
        if(!posts) return res.status(404).json({msg: 'No post found'})
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/:_id', async (req, res)=>{
    try {
        const {_id}= req.params
        const post = await PostSchema.findById({_id})
        if(!post) return res.status(404).json({msg: 'No post found'})
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.delete("/:_id", async (req, res)=>{
    try {
        const {_id}=req.params;
        const deletedPost = await PostSchema.findOneAndRemove({_id});
        res.status(200).json({mgs: 'post deleted successfully', deletedPost})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.put('/:_id', async (req, res)=>{
    try {
        const {_id}=req.params;
        const updatedPost = await PostSchema.findByIdAndUpdate({_id},{
            title: req.body.title,
            description: req.body.description
        }, {new: true});
        res.status(200).json({msg: 'post updated successfully', updatedPost})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})



module.exports = router;
import express from 'express';
// import PostSchema from'../modals/post.js'
// import verify from'./verifytoken.js';
import blogController from '../controller/blog.js'
// import Joi from '@hapi/joi'
// import {createComment} from '../controller/blog.js'

const router= express.Router();

//create => post method;
//Read => get method;
//Update => put/patch method;
//Delete => delete method

router.post('/', blogController.createPost);

router.get('/', blogController.getAll);

router.get('/:_id',  blogController.getOne)

router.delete("/:_id", blogController.deleteOne)

router.put('/:_id', blogController.updatePost)
router.post('/:_id/comment', blogController.createComment)

export default router;
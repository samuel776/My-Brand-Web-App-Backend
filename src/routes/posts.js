import express from 'express';
import PostSchema from'../modals/post.js'
import verify from'./verifytoken.js';
import blogController from '../controller/blog.js'
import Joi from '@hapi/joi'

const router= express.Router();

//create => post method;
//Read => get method;
//Update => put/patch method;
//Delete => delete method

router.post('/', verify, blogController.createPost);

router.get('/', verify, blogController.getAll);

router.get('/:_id', verify, blogController.getOne)

router.delete("/:_id", blogController.deleteOne)

router.put('/:_id', blogController.updatePost)

export default router;
const router =require('express').Router();
const User = require('./modals/userModal');

// validation

const Joi = require('@hapi/joi');

const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).lowercase().required().email().email,
    password: Joi.string().min(6).required().strict(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
}

router.post('/register', async(req,res) =>{

    // validation of data before we make a user

    const validation = schema.Validate(req.body, schema);
    res.send(validation);


    // const user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });
    // try {
    //    const savedUser = await user.save();
    //    res.send(savedUser);
    // } catch (error) {
    // res.status(400).send(error);
    // }
});






module.exports = router;
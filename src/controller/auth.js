import User from "../modals/userModal.js";
import {registerValidation, loginValidation} from'../routes/validation.js';
import dotenv from 'dotenv';
import bcrypt from'bcryptjs';
import jwt from'jsonwebtoken';

dotenv.config();

export default {
  createUser:async(req,res) =>{
    //  I can validate data before i make user
    
    const {error} = registerValidation(req.body);
        if(error) return res.status(400).json({error: error.details[0].message});
    
        // checking if the email already exist
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) return res.status(400).json({msg:"Email already exist "});
    
        // Hash the password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    
        // creating a new user
     const user = new User({
            name: req.body.name,
        email: req.body.email,
            password: hashedPassword
        });
        try {
           const savedUser = await user.save();
           res.status(201).send({user: user._id});
        } catch (error) {
        res.status(400).send(error);
        }
    },
    loggingUser:async(req,res) =>{
      const {error} = loginValidation(req.body);
      if(error) return res.status(400).json({error: error.details[0].message});
  
       // checking if the email already exist
       const user = await User.findOne({email: req.body.email});
       if(!user) return res.status(400).json({msg:"Email or Password is incorrect"});
      
      //  check correct password
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if(!validPass) return res.status(400).json({msg:'Email or Password is incorrect'});
  
      // create and assign a token
     const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
     res.header('auth-token', token).json({token});
  
  }
}

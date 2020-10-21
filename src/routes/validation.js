// validation

import Joi from"@hapi/joi";

// Register validation

export const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required().messages({
      "any.required": "name is required",
      "string.empty": "please fill in your name",
      "string.min": "name property should be at least {#limit} char",
    }),
    email: Joi.string().min(6).lowercase().required().email().messages({
      "any.required": "email is required",
      "string.empty": "please fill in your email",
      "string.min": "email property should be at least {#limit} char",
      "string.lowercase": "email should be in lowercase",
    }),
    password: Joi.string().min(6).required().strict().messages({
      "any.required": "Password is required",
      "string.empty": "please fill in your Password",
      "string.min": "Password property should be at least {#limit} char",
    }),
  });
  
  return schema.validate(data);
};
// Login validation
export const loginValidation = (data) => {
  const schema = Joi.object({
    
    email: Joi.string().min(6).lowercase().required().email().messages({
      "any.required": "email is required",
      "string.empty": "please fill in your email",
      "string.min": "email property should be at least {#limit} char",
      "string.lowercase": "email should be in lowercase",
    }),
    password: Joi.string().min(6).required().strict().messages({
      "any.required": "Password is required",
      "string.empty": "please fill in your Password",
      "string.min": "Password property should be at least {#limit} char",
    }),
  });
  return schema.validate(data);
};
// blog validation
export const blogValidation = (data) =>{
  const schema = Joi.object({
    title: Joi.string().min(10).required().messages({
        'any.required': 'title is required',
        "string.empty": 'please fill in the title of article',
        'string.min': 'title property should be at least {#limit} char'
    }),
    description: Joi.string().min(100).required().messages({
        'any.required': 'description is required',
        "string.empty": 'please fill in the description',
        'string.min': 'description property should be at least {#limit} char'
        
    }),  
    imageUrl: Joi.string().uri().messages({
      "string.uri": 'Please this should a url'
    })
  });
  return schema.validate(data);
};
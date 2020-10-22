import express from'express';
import User from'../modals/userModal.js';

import userController from '../controller/auth.js';

const router = express.Router();



router.post('/register', userController.createUser);

// Login
router.post('/login', userController.loggingUser);
export default router;
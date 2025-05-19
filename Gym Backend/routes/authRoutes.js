import express from 'express';
import { login, logout, register } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/me',protect)

export default authRouter;

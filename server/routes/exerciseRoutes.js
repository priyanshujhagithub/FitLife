import express from 'express';
import { addExercise,getMyExercises } from '../controllers/exerciseController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add',protect,addExercise);
router.get('/my',protect,getMyExercises);

export default router;
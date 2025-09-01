import express from 'express';
import { addExercise, getMyExercises, deleteSession } from '../controllers/exerciseController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add',protect,addExercise);
router.get('/my',protect,getMyExercises);
router.delete('/:sessionId',protect,deleteSession);

export default router;
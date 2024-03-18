import express from 'express';
import { retrieveData } from '../controllers/data.js';

const router = express.Router();

router.get('/data',retrieveData)

export default router;
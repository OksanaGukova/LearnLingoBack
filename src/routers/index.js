import { Router } from "express";
import teachersRouter from './teachers.js';

const router = Router();

router.use('/teachers', teachersRouter);

export default router;

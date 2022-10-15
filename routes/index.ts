import express from 'express';
import moduleRouter from './moduleRouter';
import mediaRouter from './mediaRouter';
import dataRouter from './dataRouter';

const router = express.Router();

router.use('/module', moduleRouter);
router.use('/data', dataRouter);
router.use('/media', mediaRouter);

export default router;
